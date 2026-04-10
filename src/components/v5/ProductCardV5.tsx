import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

const ASPECTS = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[5/7]",
  "aspect-[2/3]",
  "aspect-[4/5]",
] as const;

export default function ProductCardV5({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const aspectClass = ASPECTS[index % ASPECTS.length];

  return (
    <article className="group">
      <Link href={`/product/${product.slug}`} className="block">
        <div className={`relative w-full overflow-hidden bg-neutral-950 ${aspectClass}`}>
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 1440px) 50vw, 720px"
            className="object-cover transition-opacity duration-300 group-hover:opacity-90"
          />
          {!product.available && (
            <span className="absolute top-2 left-2 text-[9px] tracking-[0.2em] uppercase bg-black/70 text-white px-2 py-1">
              Esgotado
            </span>
          )}
        </div>
        <div className="bg-black px-3 py-3 sm:px-4 sm:py-4">
          <h2 className="text-[11px] sm:text-xs leading-snug text-white/95 tracking-wide font-normal">
            {product.title}
          </h2>
          {product.category && (
            <p className="mt-1 text-[10px] text-white/45 tracking-wider uppercase">
              {product.category}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
