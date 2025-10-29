import Image from "next/image";
import { Button } from "@/components/ui/button";

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
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl space-y-8 flex flex-col items-start text-left animate-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="flex items-center gap-6">
            <Image
              src="/logo.png"
              alt="Stylus Solutions Logo"
              width={180}
              height={180}
              className="w-[180px] h-[180px] object-contain drop-shadow-2xl"
              priority
            />
            <h1
              className="lg:text-8xl text-6xl text-white 
              tracking-tight font-archivo-black drop-shadow-2xl"
            >
              STYLUS SOLUTIONS
            </h1>
          </div>

          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 max-w-4xl 
            leading-relaxed font-light tracking-wide drop-shadow-lg"
          >
            Rights & Clearance Specialists, Archival Production, and Music
            Supervision Services
          </p>

          <div className="pt-6 animate-in slide-in-from-bottom-4 duration-1000 delay-700">
            <Button
              size="lg"
              className="text-lg sm:text-xl px-10 py-6 sm:py-8 bg-[#ed1566] text-white 
              hover:bg-[#ed1566]/90 hover:scale-105 active:scale-95 font-bold
              transition-all duration-300 rounded-2xl shadow-2xl shadow-[#ed1566]/30
              hover:shadow-[#ed1566]/50"
            >
              Let&apos;s connect
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
