import type { ReactNode } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-boutique-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-boutique-sans",
  display: "swap",
});

export default function V4Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} font-[family-name:var(--font-boutique-sans)] antialiased`}
    >
      {children}
    </div>
  );
}
