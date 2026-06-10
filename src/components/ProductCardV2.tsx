"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { useI18n } from "@/i18n/LanguageProvider";

export default function ProductCardV2({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { t } = useI18n();
  const cardImages = product.cardImages ?? product.images;

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
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#0a0b0e] mb-5 ring-1 ring-white/10">
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <Image
              src={cardImages[0]}
              alt={product.title}
              fill
              quality={90}
              sizes="(max-width: 640px) 100vw, 33vw"
              className="object-cover"
            />
            {cardImages[1] && (
              <Image
                src={cardImages[1]}
                alt={`${product.title} — ${t.card.alternateView}`}
                fill
                quality={90}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover opacity-0 transition-opacity duration-[900ms] ease-in-out group-hover:opacity-100"
              />
            )}
          </div>
          {!product.available && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#d4af37] text-[#0c0d10] text-[9px] tracking-[0.2em] uppercase font-semibold">
              {t.card.soldOut}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#d4af37]/60 via-white/20 to-transparent" />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#8a8580] mb-1.5">
              {product.category ?? t.card.fallbackCategory}
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
