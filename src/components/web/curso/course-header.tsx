import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "@/components/web/auth/LogoutButton";

type CourseHeaderProps = {
  courseTitle: string;
};

export function CourseHeader({ courseTitle }: CourseHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e5e7eb] bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#111827] no-underline"
        >
          <Image
            src="/logo-mili.jpeg"
            alt="MP - Mas Proteccion"
            width={40}
            height={40}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="hidden font-semibold text-[#111827] sm:inline lg:text-lg">
            Más Protección
          </span>
        </Link>

        <h1 className="truncate px-2 text-center text-sm font-semibold text-[#374151] sm:text-base">
          {courseTitle}
        </h1>

        <LogoutButton />
      </div>
    </header>
  );
}
