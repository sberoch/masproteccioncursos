"use client";
import { RowLabelProps, useRowLabel } from "@payloadcms/ui";

type OptionData = {
  optionText?: string;
  isCorrect?: boolean;
};

export const OptionRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<OptionData>();

  const label = data?.data?.optionText
    ? `${data.rowNumber !== undefined ? data.rowNumber + 1 : ""}: ${data.data.optionText}${data.data.isCorrect ? " ✓" : ""}`
    : "Empty option";

  return <div>{label}</div>;
};
