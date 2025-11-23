import { LivePreviewListener } from "../../components/payload/live-preview";

export default function Home() {
  return (
    <>
      <LivePreviewListener />
      <main className="min-h-screen w-full">
        <h1>Hello World</h1>
      </main>
    </>
  );
}
