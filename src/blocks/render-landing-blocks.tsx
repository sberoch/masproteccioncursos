import type { Home } from "@/payload-types";
import { HeroSection } from "@/blocks/HeroSection/Component";
import { CourseIntroSection } from "@/blocks/CourseIntroSection/Component";
import { AboutInstructorSection } from "@/blocks/AboutInstructorSection/Component";
import { CourseModulesSection } from "@/blocks/CourseModulesSection/Component";
import { TestimonialsSection } from "@/blocks/TestimonialsSection/Component";
import { PricingSection } from "@/blocks/PricingSection/Component";
import { FAQSection } from "@/blocks/FAQSection/Component";
import { BlogSection } from "@/blocks/BlogSection/Component";
import { CTASection } from "@/blocks/CTASection/Component";

type LandingBlock = NonNullable<Home["content"]>["blocks"] extends
  | (infer U)[]
  | null
  | undefined
  ? U
  : never;

export function renderLandingBlocks(blocks: LandingBlock[] | null | undefined) {
  if (!blocks?.length) {
    return null;
  }

  return blocks.map((block, index) => {
    const key = block.id ?? index;
    if (block.blockType === "hero") {
      return <HeroSection key={key} {...block} />;
    }
    if (block.blockType === "courseIntro") {
      return <CourseIntroSection key={key} {...block} />;
    }
    if (block.blockType === "aboutInstructor") {
      return <AboutInstructorSection key={key} {...block} />;
    }
    if (block.blockType === "courseModules") {
      return <CourseModulesSection key={key} {...block} />;
    }
    if (block.blockType === "testimonials") {
      return <TestimonialsSection key={key} {...block} />;
    }
    if (block.blockType === "pricing") {
      return <PricingSection key={key} {...block} />;
    }
    if (block.blockType === "faq") {
      return <FAQSection key={key} {...block} />;
    }
    if (block.blockType === "blog") {
      return <BlogSection key={key} {...block} />;
    }
    if (block.blockType === "cta") {
      return <CTASection key={key} {...block} />;
    }
    return null;
  });
}
