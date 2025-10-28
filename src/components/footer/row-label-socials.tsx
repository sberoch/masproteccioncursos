"use client";
import { Footer } from "@/payload-types";
import { RowLabelProps, useRowLabel } from "@payloadcms/ui";

export const RowLabelSocials: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer["socialMedia"]>[number]>();

  const label = data?.data?.title
    ? `${data.rowNumber !== undefined ? data.rowNumber + 1 : ""}: ${data?.data?.title}`
    : "Empty row";

  return <div>{label}</div>;
};
