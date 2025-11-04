import { getSocials } from "@/components/payload/api/socials";
import { Button } from "@/components/ui/button";
import type { Header as HeaderType } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getMediaUrl } from "@/utilities/getMediaUrl";
import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { CMSLink } from "../link";

export const Header = async () => {
  const header: HeaderType = (await getCachedGlobal(
    "header",
    1
  )()) as HeaderType;
  const socials = await getSocials();

  return (
    <header className="z-30 flex w-full justify-between items-center sticky top-0 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-5 lg:px-0 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              {header.logo && typeof header.logo === "object" && (
                <Image
                  src={getMediaUrl(header.logo.url ?? "")}
                  alt="Logo"
                  width={180}
                  height={180}
                  className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px]"
                />
              )}
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {header.navItems?.map((item) => (
              <CMSLink
                key={item.id}
                {...item.link}
                appearance="inline"
                className="hover:text-primary transition-colors"
              />
            ))}
            {header.cta && (
              <CMSLink
                {...header.cta.link}
                label={header.cta.label || header.cta.link.label}
              />
            )}
          </nav>

          <MobileMenu header={header} socials={socials} />
        </div>
      </div>
    </header>
  );
};
