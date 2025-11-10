import { Metadata } from "next";
import { headers } from "next/headers";
import React from "react";
import "@/styles/globals.css";
import { cn } from "../../utilities";
import { Header } from "@/components/web/header/header";
import { Footer } from "@/components/web/footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(`https://${(await headers()).get("host")}`),
    title: "Web template | Erio Software",
    description:
      "From strategy to launch: performant, maintainable software that makes your business grow. Trusted by leading brands.",
    alternates: {
      canonical: `https://${(await headers()).get("host")}`,
    },
    openGraph: {
      title: "Web template | Erio Software",
      url: `https://${(await headers()).get("host")}`,
      type: "website",
      siteName: "Erio Software",
      description:
        "From strategy to launch: performant, maintainable software that makes your business grow. Trusted by leading brands.",
      images: "/og-image.png",
    },
    twitter: {
      card: "summary_large_image",
      title: "Web template | Erio Software",
      description:
        "From strategy to launch: performant, maintainable software that makes your business grow. Trusted by leading brands.",
      images: "/og-image.png",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body className={cn("antialiased overflow-x-hidden relative")}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
