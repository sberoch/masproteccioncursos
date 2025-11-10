import type { ClientLogosBlock as ClientLogosBlockProps } from "@/payload-types";
import React from "react";
import RichText from "@/components/web/rich-text";
import { Media } from "@/components/web/media";
import { cn } from "@/utilities";

export const ClientLogosBlock: React.FC<
  ClientLogosBlockProps & {
    id?: string;
  }
> = (props) => {
  const { id, enableIntro, introContent, columnCount, logos } = props;

  const gridColsClasses = {
    "3": "grid-cols-2 md:grid-cols-3",
    "4": "grid-cols-2 md:grid-cols-4",
    "5": "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    "6": "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  const gridClass =
    gridColsClasses[columnCount as keyof typeof gridColsClasses] ||
    gridColsClasses["4"];

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

      {logos && logos.length > 0 && (
        <div className={cn("grid gap-8", gridClass)}>
          {logos.map((item, index) => {
            const logo = typeof item.logo === "object" ? item.logo : null;

            if (!logo) return null;

            const altText = item.alt || logo.alt || "Client logo";

            return (
              <div
                key={logo.id || index}
                className="flex items-center justify-center p-4"
              >
                <Media
                  resource={logo}
                  imgClassName="w-full h-auto object-contain max-h-24"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
