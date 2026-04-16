"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import ProductCardV2 from "./ProductCardV2";

export default function ProductGridV2({ products }: { products: Product[] }) {
  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-[1760px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-16 pb-8 border-b border-white/10">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#d4af37] text-[10px] tracking-[0.35em] uppercase mb-4"
            >
              Coleção
            </motion.p>
            <h2 className="font-[family-name:var(--font-v2-serif)] text-4xl md:text-6xl font-normal tracking-tight text-[#f5f2ec] leading-[1.05]">
              Obras
            </h2>
            <p className="mt-4 text-sm text-[#8a8580] max-w-md leading-relaxed">
              Vitrine editorial — foco em forma e luz. Mesmos produtos, outra
              atmosfera.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs tracking-[0.2em] uppercase text-[#8a8580] hover:text-[#d4af37] transition-colors w-fit"
          >
            ← Versões do site
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-16">
          {products.map((product, index) => (
            <ProductCardV2 key={product.slug} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
