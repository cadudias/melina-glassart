import type { Metadata } from "next";
import { Geist, Instrument_Serif, DM_Sans } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
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

export const metadata: Metadata = {
  title: "Melina Glass Art",
  description:
    "Handcrafted stained glass art pieces. Unique works blending traditional craft with contemporary design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <CartProvider>{children}</CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
