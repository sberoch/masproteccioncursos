import type {
  WorkItem,
  CollectionItemListBlock as CollectionItemListBlockProps,
} from "@/payload-types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import RichText from "@/components/web/rich-text";

import { CollectionItemList } from "@/components/web/collection-item-list";

export const CollectionItemListBlock: React.FC<
  CollectionItemListBlockProps & {
    id?: string;
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
  } = props;

  const limit = limitFromProps || 3;

  let workItems: WorkItem[] = [];

  if (populateBy === "collection") {
    const payload = await getPayload({ config: configPromise });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id;
      else return category;
    });

    const fetchedWorkItems = await payload.find({
      collection: "work-items",
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    });

    workItems = fetchedWorkItems.docs;
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedWorkItems = selectedDocs.map(
        (workItem: { value: number | WorkItem }) => {
          if (typeof workItem.value === "object") return workItem.value;
          else return undefined;
        }
      ) as (WorkItem | number)[];

      workItems = filteredSelectedWorkItems.filter(
        (workItem) => typeof workItem === "object"
      ) as WorkItem[];
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText
            className="ms-0 max-w-3xl"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}
      <CollectionItemList workItems={workItems} />
    </div>
  );
};
