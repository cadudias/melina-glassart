"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

function formatPrice(cents: number, currency: Product["currency"]): string {
  const locale = currency === "BRL" ? "pt-BR" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}

export default function ProductCardBoutique({ product }: { product: Product }) {
  const onSale =
    product.compareAtPrice != null && product.compareAtPrice > product.price;

  return (
    <article className="group w-full min-w-0">
      <Link href={`/product/${product.slug}`} className="block w-full min-w-0">
        <div className="relative aspect-square bg-neutral-100 overflow-hidden mb-3 md:mb-4">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {onSale && (
            <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1.5">
              Oferta
            </span>
          )}
          {!product.available && (
            <span className="absolute bottom-2 left-2 bg-neutral-900/85 text-white text-[11px] tracking-wider uppercase px-2.5 py-1.5">
              Esgotado
            </span>
          )}
        </div>
        <h2 className="text-base md:text-lg font-normal text-neutral-900 leading-snug mb-2.5 group-hover:text-emerald-900 transition-colors">
          {product.title}
        </h2>
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-base md:text-lg">
          {onSale && (
            <span className="text-neutral-400 line-through tabular-nums text-sm md:text-base">
              {formatPrice(product.compareAtPrice!, product.currency)}
            </span>
          )}
          <span
            className={`tabular-nums font-semibold ${
              onSale ? "text-emerald-700" : "text-neutral-900"
            }`}
          >
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-sm text-neutral-500 uppercase">{product.currency}</span>
        </div>
      </Link>
    </article>
  );
}
