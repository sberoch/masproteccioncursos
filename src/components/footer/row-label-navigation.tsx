"use client";
import { Footer } from "@/payload-types";
import { RowLabelProps, useRowLabel } from "@payloadcms/ui";

export const RowLabelNavigation: React.FC<RowLabelProps> = () => {
  const data =
    useRowLabel<
      NonNullable<NonNullable<Footer["navigation"]>["links"]>[number]
    >();

  const label = data?.data?.link?.label
    ? `${data.rowNumber !== undefined ? data.rowNumber + 1 : ""}: ${data?.data?.link?.label}`
    : "Empty row";

  return <div>{label}</div>;
};
