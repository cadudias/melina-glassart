"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-surface mb-4">
          {/* Primary image */}
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-opacity duration-500 ease-out"
            style={{ opacity: isHovered ? 0 : 1 }}
          />

          {/* Secondary image (hover) */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.title} - alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-opacity duration-500 ease-out"
              style={{ opacity: isHovered ? 1 : 0 }}
            />
          )}

          {/* Sold out badge */}
          {!product.available && (
            <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-accent text-white text-[10px] tracking-[0.18em] uppercase font-medium border border-accent-dim shadow-[0_8px_20px_rgba(169,108,57,0.35)]">
              Sold Out
            </div>
          )}

          {/* Hover border reveal */}
          <motion.div
            className="absolute inset-0 border border-accent/0 pointer-events-none"
            animate={{ borderColor: isHovered ? "rgba(169,108,57,0.3)" : "rgba(169,108,57,0)" }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Product info */}
        <div>
          <h3 className="text-sm tracking-wide text-foreground group-hover:text-accent transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-xs text-muted mt-1">
            {product.dimensions.width} x {product.dimensions.height} x{" "}
            {product.dimensions.depth} {product.dimensions.unit}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
