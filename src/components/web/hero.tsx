"use client";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { TextLoop } from "../ui/text-loop";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
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

  const heroImages = [
    {
      src: "/hero1.jpg",
      alt: "Hero image 1",
      wrapperClass:
        "absolute top-[15%] right-[4%] w-[25%] aspect-4/3 rounded-2xl overflow-hidden rotate-2",
    },
    {
      src: "/hero2.jpeg",
      alt: "Hero image 2",
      wrapperClass:
        "absolute top-[28%] right-[8%] w-[25%] aspect-4/3 rounded-2xl overflow-hidden -rotate-3",
    },
    {
      src: "/hero3.webp",
      alt: "Hero image 3",
      wrapperClass:
        "absolute top-[41%] right-[7%] w-[25%] aspect-4/3 rounded-2xl overflow-hidden rotate-6",
    },
    {
      src: "/hero4.jpg",
      alt: "Hero image 4",
      wrapperClass:
        "absolute top-[56%] right-[10%] w-[25%] aspect-4/3 rounded-2xl overflow-hidden -rotate-4",
    },
  ];

  useEffect(() => {
    const moveGradient = (event: MouseEvent) => {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      const mouseX = Math.round((event.pageX / winWidth) * 100);
      const mouseY = Math.round((event.pageY / winHeight) * 100);

      if (ref.current) {
        ref.current.style.setProperty("--mouse-x", `${mouseX}%`);
        ref.current.style.setProperty("--mouse-y", `${mouseY}%`);
      }

      // Parallax effect for images
      if (imagesRef.current) {
        const moveX = (event.clientX - winWidth / 2) / 50;
        const moveY = (event.clientY - winHeight / 2) / 50;
        imagesRef.current.style.setProperty("--parallax-x", `${moveX}px`);
        imagesRef.current.style.setProperty("--parallax-y", `${moveY}px`);
      }
    };
    document.addEventListener("mousemove", moveGradient);
    return () => {
      document.removeEventListener("mousemove", moveGradient);
    };
  }, [ref]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 w-full h-full bg-[#ec409e2c]"
        ref={ref}
      >
        <div className="blob-cont">
          <div className="blob-1 blob"></div>
          <div className="blob-2 blob"></div>
          <div className="blob-3 blob"></div>
          <div className="blob-4 blob"></div>
        </div>
      </div>
      <div ref={imagesRef}>
        {heroImages.map((img, index) => (
          <div key={index} className={img.wrapperClass}>
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              className="w-fit h-fit object-contain rounded-2xl"
              priority
            />
          </div>
        ))}
      </div>
      <div className="relative container mx-auto px-5 lg:px-0 z-10">
        <h1 className="lg:text-[10rem] text-6xl max-w-4xl tracking-tight font-archivo-black text-[#1d1d1d]">
          STYLUS SOLUTIONS
        </h1>

        <div
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl text-[#1d1d1d]
            leading-relaxed font-light tracking-wide mt-12 uppercase"
        >
          <span>Clearances for </span>
          <TextLoop interval={3}>
            {["MUSIC", "FOOTAGE", "IMAGES", "TALENT"].map((text) => (
              <span className="italic" key={text}>
                {text}
              </span>
            ))}
          </TextLoop>
        </div>
      </div>
    </div>
  );
};
