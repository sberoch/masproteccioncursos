import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Define the props interface for the header component
interface HeaderProps {
  logoSrc: string;
  logoAlt: string;
  navLinks: { label: string; href: string }[];
}

// Helper component for navigation links
const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-white/60 transition-all hover:text-[#ed1566] uppercase"
  >
    {children}
  </a>
);

export const Header = ({ logoSrc, logoAlt, navLinks }: HeaderProps) => {
  return (
    <header className="z-30 flex w-full max-w-7xl items-center justify-between">
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative h-[40px] w-[40px] lg:h-[60px] lg:w-[60px] cursor-pointer hover:scale-110 transition-all duration-200"
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          fill
          className="object-contain object-left"
          priority
        />
      </motion.a>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden items-center space-x-8 md:flex"
      >
        {navLinks.map((link) => (
          <NavLink key={link.label} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </motion.div>
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-1.5 md:hidden"
        aria-label="Open menu"
      >
        <span className="block h-0.5 w-6 bg-background"></span>
        <span className="block h-0.5 w-6 bg-background"></span>
        <span className="block h-0.5 w-5 bg-background"></span>
      </motion.button>
    </header>
  );
};
