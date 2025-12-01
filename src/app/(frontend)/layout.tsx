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
    title: "Mas Proteccion",
    description:
      "Cursos de primeros auxilios diseñados para personas y organizaciones que necesitan responder con eficacia ante emergencias.",
    alternates: {
      canonical: `https://${(await headers()).get("host")}`,
    },
    openGraph: {
      title: "Mas Proteccion",
      url: `https://${(await headers()).get("host")}`,
      type: "website",
      siteName: "Mas Proteccion",
      description:
        "Aprende a protegerte y a proteger a los tuyos. Cursos de seguridad y prevención de riesgos.",
      images: "/og-image.png",
    },
    twitter: {
      card: "summary_large_image",
      title: "Mas Proteccion",
      description:
        "Aprende a protegerte y a proteger a los tuyos. Cursos de seguridad y prevención de riesgos.",
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
