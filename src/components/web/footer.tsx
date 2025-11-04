import { getCachedGlobal } from "@/utilities/getGlobals";
import type { Footer as FooterType } from "@/payload-types";
import { getSocials } from "../payload/api/socials";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { CMSLink } from "./link";
import RichText from "./rich-text";

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

export const Footer = async () => {
  const footer: FooterType = (await getCachedGlobal(
    "footer",
    1
  )()) as FooterType;
  const socials = await getSocials();

  return (
    <footer className="w-full border-t bg-foreground">
      <div className="container mx-auto px-5 lg:px-0 py-12 text-background">
        {/* Three sections grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Text Section */}
          <div className="space-y-4 col-span-1 lg:col-span-2">
            {footer.content && (
              <RichText
                data={footer.content}
                className="prose-headings:text-background prose-p:text-background/80 prose-a:text-background/80 prose-a:underline
                prose-a:hover:text-background prose-li:text-background/80 prose-strong:text-background prose-em:text-background/80
                prose-blockquote:text-background/80"
              />
            )}
          </div>

          {/* Navigation Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {footer.navigation?.title || "Quick Links"}
            </h3>
            <nav className="flex flex-col gap-2">
              {footer.navigation?.links?.map((linkItem, index) => (
                <CMSLink
                  key={index}
                  {...linkItem.link}
                  appearance="inline"
                  className="text-background/80 hover:text-background transition-colors w-fit"
                />
              ))}
            </nav>
          </div>

          {/* Socials Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow us</h3>
            <div className="flex gap-4">
              {socials.docs.map((social) => {
                const Icon = getSocialIcon(social.icon);
                if (!Icon) return null;
                return (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background hover:text-foreground transition-colors"
                  >
                    <Icon className="size-6" />
                    <span className="sr-only">{social.icon}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Horizontal line and copyright */}
        <div className="mt-12 pt-8 border-t border-background/20">
          <p className="text-center text-sm text-background">
            © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
