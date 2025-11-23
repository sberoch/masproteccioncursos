import { BannerBlock } from "@/blocks/Banner/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ClientLogosBlock } from "@/blocks/ClientLogos/Component";
import { CollectionItemListBlock } from "@/blocks/CollectionItemListBlock/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { GalleryBlock } from "@/blocks/Gallery/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { PageHero } from "@/components/web/page-hero";
import type { Form as PluginFormType } from "@payloadcms/plugin-form-builder/types";
import type { Page } from "@/payload-types";

type LayoutBlock = NonNullable<Page["content"]>["layout"] extends
  | (infer U)[]
  | null
  | undefined
  ? U
  : never;

export function renderBlocks(blocks: LayoutBlock[] | null | undefined) {
  if (!blocks) {
    return null;
  }

  return blocks.map((block, index) => {
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
        <MediaBlock key={block.id || index} {...block} imgClassName="mx-auto" />
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
  });
}
