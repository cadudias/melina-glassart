"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

export default function ProductCardV2({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: (index % 6) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="font-[family-name:var(--font-v2-sans)]"
    >
      <Link
        href={`/product/${product.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#16181f] mb-5 ring-1 ring-white/10">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ opacity: isHovered && product.images[1] ? 0 : 1 }}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.title} — vista alternativa`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-opacity duration-500"
              style={{ opacity: isHovered ? 1 : 0 }}
            />
          )}
          {!product.available && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#d4af37] text-[#0c0d10] text-[9px] tracking-[0.2em] uppercase font-semibold">
              Esgotado
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#d4af37]/60 via-white/20 to-transparent" />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#8a8580] mb-1.5">
              {product.category ?? "Obra"}
            </p>
            <h3 className="font-[family-name:var(--font-v2-serif)] text-xl md:text-2xl text-[#f5f2ec] group-hover:text-[#d4af37] transition-colors duration-300 leading-snug">
              {product.title}
            </h3>
            <p className="text-xs text-[#8a8580] mt-2 tabular-nums">
              {product.dimensions.width} × {product.dimensions.height} ×{" "}
              {product.dimensions.depth} {product.dimensions.unit}
            </p>
          </div>
          <span className="text-[10px] text-[#5c5854] tabular-nums pt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
