"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

const ACCENT_STRIP = [
  "bg-amber-400",
  "bg-rose-500",
  "bg-violet-500",
  "bg-teal-500",
  "bg-emerald-500",
  "bg-sky-500",
] as const;

export default function ProductCardV3({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const leadAccent = ACCENT_STRIP[index % ACCENT_STRIP.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: (index % 6) * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative rounded-lg bg-white/80 backdrop-blur-sm border-2 border-stone-800/20 shadow-[5px_5px_0_0_rgba(28,25,23,0.06)] transition-all duration-300 group-hover:border-amber-700/35 group-hover:shadow-[8px_8px_0_0_rgba(217,119,6,0.12)] overflow-hidden"
        >
          <div
            className={`absolute left-0 top-0 bottom-0 w-1.5 z-10 ${leadAccent} opacity-90`}
            aria-hidden
          />

          <div className="relative aspect-square overflow-hidden bg-stone-100 ring-1 ring-inset ring-stone-800/10">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-opacity duration-500 ease-out"
              style={{ opacity: isHovered && product.images[1] ? 0 : 1 }}
            />
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={`${product.title} — vista alternativa`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-opacity duration-500"
                style={{ opacity: isHovered ? 1 : 0 }}
              />
            )}

            {!product.available && (
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-stone-900/85 text-[10px] tracking-[0.18em] uppercase text-amber-100 border border-stone-600">
                Esgotado
              </div>
            )}

            {/* “Chumbo”: linhas finas no canto */}
            <div
              className="pointer-events-none absolute inset-2 border border-white/25 rounded-sm opacity-60"
              aria-hidden
            />
          </div>

          <div className="p-4 md:p-5 pl-5 md:pl-6">
            <div className="flex gap-1 mb-3" aria-hidden>
              {ACCENT_STRIP.map((c, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full ${c} opacity-80`}
                />
              ))}
            </div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-teal-800/80 mb-1">
              {product.category ?? "Vitrail"}
            </p>
            <h3 className="font-[family-name:var(--font-v3-display)] text-xl md:text-2xl text-stone-900 leading-tight group-hover:text-amber-900 transition-colors">
              {product.title}
            </h3>
            <p className="text-xs text-stone-600 mt-2 tabular-nums">
              {product.dimensions.width} × {product.dimensions.height} ×{" "}
              {product.dimensions.depth} {product.dimensions.unit}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
