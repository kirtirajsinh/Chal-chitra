import "@/styles/globals.css";
import { DynaPuff } from "@next/font/google";

const dynaPuff = DynaPuff({
  subsets: ["latin"],
  variable: "--font-dynapuff",
  weight: "400",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={`${dynaPuff.variable}`}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
