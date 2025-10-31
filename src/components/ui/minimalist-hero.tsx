import React, { RefObject, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDownIcon, LucideIcon } from "lucide-react";
import { cn } from "@/utilities/index";
import { ImageTrail } from "./image-trail";
import { Header } from "./header";

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  images: string[];
  logoSrc: string;
  logoAlt: string;
  navLinks: { label: string; href: string }[];
  heading: string;
  description: string;
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
  nextSectionId?: string;
}

// Helper component for social media icons
const SocialIcon = ({
  href,
  icon: Icon,
}: {
  href: string;
  icon: LucideIcon;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/60 transition-colors hover:text-[#ed1566]"
  >
    <Icon className="h-5 w-5" />
  </a>
);

// The main reusable Hero Section component
export const MinimalistHero = ({
  images,
  logoSrc,
  logoAlt,
  navLinks,
  heading,
  description,
  socialLinks,
  locationText,
  className,
  nextSectionId = "next-section",
}: MinimalistHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-foreground p-8 md:p-12 font-archivo",
        className
      )}
    >
      <div className="absolute top-0 left-0 z-0" ref={ref}>
        <ImageTrail containerRef={ref as RefObject<HTMLElement>}>
          {images.map((url, index) => (
            <div
              key={index}
              className="flex relative overflow-hidden w-24 h-24 rounded-lg"
            >
              <img
                src={url}
                alt={`Trail image ${index + 1}`}
                className="object-cover absolute inset-0 hover:scale-110 transition-transform"
              />
            </div>
          ))}
        </ImageTrail>
      </div>
      <Header logoSrc={logoSrc} logoAlt={logoAlt} navLinks={navLinks} />

      {/* Main Content Area */}
      <div className="relative w-full max-w-7xl flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-20 flex items-center justify-center text-center"
        >
          <h1 className="font-extrabold text-background text-6xl md:text-8xl lg:text-9xl max-w-3xl">
            {heading}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-20 text-center flex flex-col items-center"
        >
          <p className="mx-auto max-w-xs text-lg leading-relaxed text-background/80 md:mx-0">
            {description}
          </p>
          <a
            href={`#${nextSectionId}`}
            onClick={handleScrollDown}
            className="mt-16 text-sm font-medium text-background decoration-from-font flex items-center gap-2 cursor-pointer"
          >
            Scroll down to explore
            <ArrowDownIcon className="w-4 h-4 animate-bounce translate-y-[2px]" />
          </a>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <div className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-background/80"
        >
          {locationText}
        </motion.div>
      </div>
    </div>
  );
};
