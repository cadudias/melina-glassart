"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-end overflow-hidden">
      {/* Background grain overlay */}
      <div
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Subtle radial glow */}
      <div
        className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 items-end">
          {/* Left: Main content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-accent text-sm tracking-[0.3em] uppercase mb-6"
            >
              Handcrafted Stained Glass
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-none font-light mb-8"
            >
              Where light
              <br />
              meets <span className="text-accent">craft</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-muted text-base md:text-lg leading-relaxed max-w-[50ch]"
            >
              Each piece is a unique composition of glass, metal, and light.
              Handcrafted with traditional techniques, designed for contemporary
              spaces.
            </motion.p>
          </div>

          {/* Right: Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="hidden md:flex flex-col items-end gap-4"
          >
            <span className="text-muted text-xs tracking-[0.2em] uppercase [writing-mode:vertical-lr]">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-px h-12 bg-gradient-to-b from-accent/60 to-transparent"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
