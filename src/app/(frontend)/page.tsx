import Image from "next/image";
import { Hero } from "@/components/web/hero";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="w-full h-full">
        <Hero />
        <section id="next-section" className="mt-24 mb-16">
          <h2 className="text-4xl font-bold mb-2 font-archivo-black">
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
            <div className="aspect-video bg-linear-to-br from-purple-400 to-blue-500 rounded-2xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop"
                alt="Featured work 1"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="aspect-video bg-linear-to-br from-pink-400 to-orange-500 rounded-2xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800&h=600&fit=crop"
                alt="Featured work 2"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="aspect-video bg-linear-to-br from-green-400 to-teal-500 rounded-2xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&h=600&fit=crop"
                alt="Featured work 3"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="aspect-video bg-linear-to-br from-yellow-400 to-red-500 rounded-2xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=800&h=600&fit=crop"
                alt="Featured work 4"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="aspect-video bg-linear-to-br from-indigo-400 to-purple-500 rounded-2xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop"
                alt="Featured work 5"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="aspect-video bg-linear-to-br from-cyan-400 to-blue-500 rounded-2xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=800&h=600&fit=crop"
                alt="Featured work 6"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
