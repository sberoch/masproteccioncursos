"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type LandingNavItem = {
  blockType: string;
  href: string;
  label: string;
  cta?: boolean;
};

export function LandingHeaderMobile({ items }: { items: LandingNavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Menú"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="top-0 mt-0 max-h-full">
        <DrawerHeader className="flex flex-row items-center justify-end border-b p-4">
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" aria-label="Cerrar menú">
              <X className="h-6 w-6" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <nav className="flex flex-col gap-1 p-6">
          {items.map((item) => (
            <Link
              key={item.blockType}
              href={item.href}
              onClick={() => setOpen(false)}
              className={
                item.cta
                  ? "inline-flex items-center justify-center rounded-lg bg-[#ec1313] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c91010]"
                  : "text-lg font-medium text-[#374151] transition hover:text-[#0f4ba3] py-2"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
