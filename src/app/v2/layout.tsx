import type { ReactNode } from "react";
import { Instrument_Serif, DM_Sans } from "next/font/google";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-v2-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-v2-sans",
  display: "swap",
});

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${instrument.variable} ${dmSans.variable} min-h-full bg-[#0c0d10] text-[#ece8e1] font-[family-name:var(--font-v2-sans)] antialiased`}
    >
      {children}
    </div>
  );
}
