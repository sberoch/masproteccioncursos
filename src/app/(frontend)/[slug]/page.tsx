import { BannerBlock } from "@/blocks/Banner/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ClientLogosBlock } from "@/blocks/ClientLogos/Component";
import { CollectionItemListBlock } from "@/blocks/CollectionItemListBlock/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { GalleryBlock } from "@/blocks/Gallery/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { PageHero } from "@/components/web/page-hero";
import { generateMeta } from "@/utilities/generateMeta";
import configPromise from "@payload-config";
import type { Form as PluginFormType } from "@payloadcms/plugin-form-builder/types";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPayload, RequiredDataFromCollectionSlug } from "payload";
import { cache } from "react";

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
    <main className="min-h-screen w-full">
      {page.content?.layout?.map((block, index) => {
        if (block.blockType === "header") {
          return (
            <PageHero
              key={block.id || index}
              heading={block.heading}
              subheading={block.subheading}
              image={block.image}
            />
          );
        }
        if (block.blockType === "content") {
          return <ContentBlock key={block.id || index} {...block} />;
        }
        if (block.blockType === "banner") {
          return <BannerBlock key={block.id || index} {...block} />;
        }
        if (block.blockType === "cta") {
          return <CallToActionBlock key={block.id || index} {...block} />;
        }
        if (block.blockType === "mediaBlock") {
          return (
            <MediaBlock
              key={block.id || index}
              {...block}
              imgClassName="mx-auto"
            />
          );
        }
        if (block.blockType === "formBlock") {
          const form =
            block.form && typeof block.form === "object"
              ? (block.form as unknown as PluginFormType)
              : undefined;
          if (!form) return null;
          return (
            <FormBlock
              key={block.id || index}
              id={block.id ?? undefined}
              enableIntro={!!block.enableIntro}
              form={form}
              introContent={block.introContent ?? undefined}
              formClassName="lg:max-w-3xl"
            />
          );
        }
        if (block.blockType === "collectionItemList") {
          return (
            <CollectionItemListBlock
              key={block.id || index}
              {...block}
              id={block.id ?? undefined}
            />
          );
        }
        if (block.blockType === "clientLogos") {
          return (
            <ClientLogosBlock
              key={block.id || index}
              {...block}
              id={block.id ?? undefined}
            />
          );
        }
        if (block.blockType === "gallery") {
          return (
            <GalleryBlock
              key={block.id || index}
              {...block}
              id={block.id ?? undefined}
            />
          );
        }
        return null;
      })}
    </main>
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
