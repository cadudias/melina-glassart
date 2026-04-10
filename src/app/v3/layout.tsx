import type { ReactNode } from "react";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-v3-display",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-v3-sans",
  display: "swap",
});

export default function V3Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} ${plusJakarta.variable} min-h-full font-[family-name:var(--font-v3-sans)] antialiased text-stone-900`}
    >
      {children}
    </div>
  );
}
