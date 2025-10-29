import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg_hero_3.png"
          alt="Hero background"
          className="object-cover w-full h-full object-bottom scale-105 animate-in fade-in duration-1000"
          width={1920}
          height={1080}
          priority
          quality={90}
        />
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <Image
        src="/logo.png"
        alt="Stylus Solutions Logo"
        width={180}
        height={180}
        className="w-[120px] h-[120px] object-contain absolute top-16 left-16 opacity-80"
        priority
      />
      <h1
        className="lg:text-9xl text-6xl text-gray-300/95 absolute bottom-16 left-16 max-w-4xl
              tracking-tight font-archivo-black drop-shadow-2xl"
      >
        STYLUS SOLUTIONS
      </h1>

      <div
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300/95 max-w-4xl text-end
            leading-relaxed font-light tracking-wide drop-shadow-lg absolute top-16 right-16"
      >
        <p>Rights & Clearance Specialists</p>
        <p>Archival Production</p>
        <p>Music Supervision</p>
      </div>

      <div className="absolute bottom-16 right-16">
        <Button
          variant="ghost"
          size="lg"
          className="text-gray-300/95 hover:text-gray-300 hover:bg-transparent hover:scale-105 transition-all duration-300"
        >
          scroll down to explore
          <ArrowDownIcon className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
