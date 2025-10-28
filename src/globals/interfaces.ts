import { Media } from "../payload-types";

export interface MainPage {
  title: string;
  slug: string;
  meta?: {
    title?: string | null;
    image?: (number | null) | Media;
    description?: string | null;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
