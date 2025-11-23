import { renderBlocks } from "@/blocks/render-blocks";
import { generateMeta } from "@/utilities/generateMeta";
import configPromise from "@payload-config";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload, RequiredDataFromCollectionSlug } from "payload";
import { cache } from "react";
import { LivePreviewListener } from "../../../components/payload/live-preview";

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: "pages",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== "home";
    })
    .map(({ slug }) => {
      return { slug };
    });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

export default async function Page({ params }: Args) {
  const { slug = "home" } = await params;
  const decodedSlug = decodeURIComponent(slug);
  let page: RequiredDataFromCollectionSlug<"pages"> | null;

  page = await queryPageBySlug({
    slug: decodedSlug,
  });

  if (!page) {
    notFound();
  }

  return (
    <>
      <LivePreviewListener />
      <main className="min-h-screen w-full">
        {renderBlocks(page.content?.layout)}
      </main>
    </>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = "home" } = await paramsPromise;
  const decodedSlug = decodeURIComponent(slug);
  const page = await queryPageBySlug({
    slug: decodedSlug,
  });

  return generateMeta({ doc: page });
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "pages",
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
