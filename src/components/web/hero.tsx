"use client";

import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";

export const Hero = () => {
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Work", href: "#" },
    { label: "Services", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  const images = [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d",
  ].map((url) => `${url}?auto=format&fit=crop&w=300&q=80`);

  return (
    <MinimalistHero
      logoSrc="/logo.png"
      logoAlt="Stylus Solutions"
      navLinks={navLinks}
      heading="STYLUS SOLUTIONS"
      description="Rights & Clearance Specialists, Archival Production, Music Supervision"
      socialLinks={socialLinks}
      locationText="NYC - MIA - LA"
      images={images}
      nextSectionId="next-section"
    />
  );
};
