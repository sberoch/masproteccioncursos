"use client";

import {
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Header as HeaderType } from "@/payload-types";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { Social as SocialType } from "@/payload-types";
import { PaginatedDocs } from "payload";
import { CMSLink } from "../link";

interface MobileMenuProps {
  header: HeaderType;
  socials: PaginatedDocs<SocialType>;
}

const getSocialIcon = (iconName: string) => {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
  };
  return icons[iconName.toLowerCase()] || null;
};

export const MobileMenu = ({ header, socials }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu size={32} className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex flex-row items-center justify-end p-4">
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X size={32} className="size-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col flex-1 justify-between">
          <nav className="flex flex-col gap-4 p-4">
            {header.navItems?.map((item) => (
              <div key={item.id} onClick={() => setOpen(false)}>
                <CMSLink
                  {...item.link}
                  appearance="inline"
                  className="text-lg font-medium hover:text-primary transition-colors py-2"
                />
              </div>
            ))}
            {header.cta && (
              <div onClick={() => setOpen(false)} className="mt-4 w-fit">
                <CMSLink
                  {...header.cta.link}
                  label={header.cta.label || header.cta.link.label}
                />
              </div>
            )}
          </nav>
          {socials.docs && socials.docs.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex gap-4 justify-center items-center">
                {socials.docs.map((social) => {
                  const Icon = getSocialIcon(social.icon);
                  if (!Icon) return null;
                  return (
                    <Link
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="size-5" />
                      <span className="sr-only">{social.icon}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
