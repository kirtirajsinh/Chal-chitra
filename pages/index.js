import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/landingPage/Header";
import Feature from "@/components/landingPage/Feature";
import Nav from "@/components/landingPage/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      <Nav />
      <Header />
      <Feature />
    </main>
  );
}
