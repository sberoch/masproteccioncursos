import type { Home } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import Image from "next/image";
import Link from "next/link";
import { LandingHeaderMobile } from "./landing-header-mobile";

type LandingNavBlockType =
  | "hero"
  | "aboutInstructor"
  | "courseModules"
  | "blog"
  | "cta"
  | "faq"
  | "pricing";

const NAV_ITEMS: {
  blockType: LandingNavBlockType;
  href: string;
  label: string;
  cta?: boolean;
}[] = [
  { blockType: "hero", href: "#inicio", label: "Inicio" },
  { blockType: "aboutInstructor", href: "#sobre-mi", label: "Sobre mí" },
  { blockType: "courseModules", href: "#curso", label: "El Curso" },
  { blockType: "blog", href: "#blog", label: "Blog" },
  { blockType: "cta", href: "#contacto", label: "Contacto" },
  { blockType: "faq", href: "#faq", label: "Preguntas Frecuentes" },
  {
    blockType: "pricing",
    href: "#inscripcion",
    label: "Inscribirse",
    cta: true,
  },
];

const NAV_BLOCK_TYPES: LandingNavBlockType[] = [
  "hero",
  "aboutInstructor",
  "courseModules",
  "blog",
  "cta",
  "faq",
  "pricing",
];

function getVisibleNavItems(blocks: NonNullable<Home["content"]>["blocks"]) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return NAV_ITEMS;
  }
  const blockTypes = new Set(
    blocks
      .map((b) => b.blockType)
      .filter((t): t is LandingNavBlockType =>
        NAV_BLOCK_TYPES.includes(t as LandingNavBlockType)
      )
  );
  const visible = NAV_ITEMS.filter((item) => blockTypes.has(item.blockType));
  return visible.length > 0 ? visible : NAV_ITEMS;
}

export async function LandingHeader() {
  let visibleItems = NAV_ITEMS;
  try {
    const home = (await getCachedGlobal("home", 0)()) as Home | null;
    visibleItems = getVisibleNavItems(home?.content?.blocks ?? null);
  } catch {
    // DB not migrated or error: show all links
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-[#e5e7eb] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#111827] no-underline"
          >
            <Image
              src="/logo-mili.jpeg"
              alt="MP - Mas Proteccion"
              width={48}
              height={48}
              className="h-10 w-10 rounded-full object-cover lg:h-12 lg:w-12"
            />
            <span className="font-semibold text-[#111827] lg:text-lg">
              Más Protección
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {visibleItems.map((item) => (
              <Link
                key={item.blockType}
                href={item.href}
                className={
                  item.cta
                    ? "inline-flex items-center justify-center rounded-lg bg-[#ec1313] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#c91010]"
                    : "text-[#374151] transition hover:text-[#0f4ba3]"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <LandingHeaderMobile items={visibleItems} />
        </div>
      </div>
    </header>
  );
}
