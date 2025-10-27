import { Media } from "../payload-types";

export interface MainPage {
  title: string;
  slug: string;
  content: {
    heading: string;
    subheading?: string | null;
    backgroundImage?: (number | null) | Media;
    content?: {
      root: {
        type: string;
        children: {
          type: any;
          version: number;
          [k: string]: unknown;
        }[];
        direction: ("ltr" | "rtl") | null;
        format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
        indent: number;
        version: number;
      };
      [k: string]: unknown;
    } | null;
  };
  meta?: {
    title?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
    description?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
