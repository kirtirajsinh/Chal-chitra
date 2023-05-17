import Image from "next/image";
import { Inter } from "next/font/google";
import VidPrompt from "@/components/VidPrompt";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <VidPrompt />
    </main>
  );
}
