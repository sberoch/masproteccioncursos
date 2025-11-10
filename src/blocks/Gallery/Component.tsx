import type { GalleryBlock as GalleryBlockProps } from "@/payload-types";
import React from "react";
import RichText from "@/components/web/rich-text";
import { Media } from "@/components/web/media";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const GalleryBlock: React.FC<
  GalleryBlockProps & {
    id?: string;
  }
> = (props) => {
  const { id, enableIntro, introContent, images } = props;

  return (
    <div className="my-16 container mx-auto" id={`block-${id}`}>
      {enableIntro && introContent && (
        <div className="mb-16">
          <RichText
            className="ms-0 max-w-3xl"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}

      {images && images.length > 0 && (
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {images.map((item, index) => {
              const image = typeof item.image === "object" ? item.image : null;

              if (!image) return null;

              return (
                <CarouselItem key={image.id || index}>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-full">
                      <Media
                        resource={image}
                        imgClassName="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                    {item.caption && (
                      <p className="text-center text-sm text-muted-foreground max-w-2xl">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};
