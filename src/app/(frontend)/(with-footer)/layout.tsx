import { Footer } from "@/components/web/footer";

export default function WithFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
