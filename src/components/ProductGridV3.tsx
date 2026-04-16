"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import ProductCardV3 from "./ProductCardV3";

export default function ProductGridV3({ products }: { products: Product[] }) {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Fundo: calor + verde suave (sol e folha), sem gritar */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-50/90 via-lime-50/40 to-fuchsia-50/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-200/35 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-emerald-200/25 blur-3xl"
        aria-hidden
      />

      <div className="relative max-w-[1760px] mx-auto px-5 md:px-8 xl:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-14 pb-8 border-b-2 border-stone-800/15">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-[0.35em] uppercase text-rose-800/80 mb-3"
            >
              Vitral · luz e cor
            </motion.p>
            <h2 className="font-[family-name:var(--font-v3-display)] text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-[1.08]">
              Obras em vidro
            </h2>
            {/* Faixa inspirada na grade de pastilhas do vitral */}
            <div
              className="flex gap-1.5 mt-5 max-w-md"
              aria-hidden
            >
              {[
                "bg-rose-500",
                "bg-amber-400",
                "bg-violet-600",
                "bg-teal-500",
                "bg-emerald-600",
                "bg-sky-500",
                "bg-fuchsia-500",
              ].map((bg, i) => (
                <span key={i} className={`h-2 flex-1 rounded-sm ${bg} opacity-85`} />
              ))}
            </div>
            <p className="mt-6 text-sm text-stone-600 leading-relaxed max-w-lg">
              Mesmo catálogo, outra atmosfera: cores do sol, do verde e dos
              detalhes em vidro — com bordas firmes e muito respiro.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs tracking-[0.2em] uppercase text-teal-800 hover:text-amber-900 transition-colors w-fit shrink-0"
          >
            ← Versões do site
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
          {products.map((product, index) => (
            <ProductCardV3 key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
