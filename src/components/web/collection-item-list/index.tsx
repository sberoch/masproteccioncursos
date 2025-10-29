import { cn } from "@/utilities";
import React from "react";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Media, WorkItem } from "../../../payload-types";
import { CardContent, CardHeader, CardTitle } from "../../ui/card";

export type Props = {
  workItems: WorkItem[];
};

export const CollectionItemList: React.FC<Props> = (props) => {
  const { workItems } = props;

  return (
    <div className={cn("container")}>
      <div>
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {workItems?.map((workItem, index) => {
            if (typeof workItem === "object" && workItem !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>{workItem.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={(workItem.media as Media).url ?? ""}
                        alt={workItem.title}
                        width={100}
                        height={100}
                      />
                    </CardContent>
                  </Card>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};
