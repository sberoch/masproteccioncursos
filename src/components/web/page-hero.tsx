import type { Media } from "@/payload-types";
import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import Image from "next/image";
import RichText from "./rich-text";

type PageHeroProps = {
  heading: string;
  subheading: DefaultTypedEditorState;
  image: number | Media;
};

export const PageHero: React.FC<PageHeroProps> = ({
  heading,
  subheading,
  image,
}) => {
  const imageData = typeof image === "object" ? image : null;

  return (
    <div className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
      {imageData && (
        <div className="absolute inset-0 z-0">
          <Image
            src={getMediaUrl(imageData.url ?? "")}
            alt={imageData.alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-5 lg:px-0 py-20">
        <h1 className="text-4xl lg:text-6xl font-bold mb-6">{heading}</h1>
        <div className="max-w-3xl text-lg lg:text-xl">
          <RichText
            data={subheading}
            enableGutter={false}
            enableProse={false}
          />
        </div>
      </div>
    </div>
  );
};
