"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, Currency } from "@/types/product";
import { useCart } from "@/components/CartProvider";
import { useI18n } from "@/i18n/LanguageProvider";

function formatPrice(cents: number, currency: Currency): string {
  const locale = currency === "BRL" ? "pt-BR" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}

function formatDimensions(product: Product): string {
  const { width, height, depth, unit } = product.dimensions;
  return `${width} × ${height} × ${depth} ${unit}`;
}

export default function ProductDetailView({
  product,
  previousProduct,
  nextProduct,
}: {
  product: Product;
  previousProduct: Product;
  nextProduct: Product;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [openPolicy, setOpenPolicy] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);
  const { addToCart } = useCart();
  const { lang, t } = useI18n();

  const images = useMemo(
    () => (product.images.length > 0 ? product.images : ["/placeholder.jpg"]),
    [product.images],
  );

  const materials = product.materials[lang];
  const extras = product.extras?.[lang];
  const money = product.price[lang];

  return (
    <main className="flex-1 pt-24 md:pt-28 pb-16 bg-[#0c0d10] text-[#ece8e1] font-[family-name:var(--font-v2-sans)]">
      <section className="max-w-[1760px] mx-auto px-5 md:px-8 xl:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-xs tracking-wider">
          <div className="flex items-center gap-2 text-[#8a8580]">
            <Link href="/" className="hover:text-[#d4af37] transition-colors">
              {t.product.breadcrumbHome}
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-[#d4af37] transition-colors">
              {t.product.breadcrumbAll}
            </Link>
            <span>/</span>
            <span className="text-[#f5f2ec]">{product.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/product/${previousProduct.slug}`}
              className="text-[#8a8580] hover:text-[#d4af37] transition-colors"
            >
              &lt; {t.product.previous}
            </Link>
            <span className="text-white/15">|</span>
            <Link
              href={`/product/${nextProduct.slug}`}
              className="text-[#8a8580] hover:text-[#d4af37] transition-colors"
            >
              {t.product.next} &gt;
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] gap-10 xl:gap-14 items-start">
          <div>
            <div className="relative aspect-square w-full overflow-hidden border border-white/10 bg-[#16181f]">
              <Image
                src={images[selectedImage]}
                alt={product.title}
                fill
                sizes="(max-width: 1280px) 100vw, 65vw"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#d4af37]/60 via-white/20 to-transparent" />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              {images.map((image, index) => (
                <button
                  key={`${product.slug}-thumb-${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-14 w-14 overflow-hidden border transition-all ${
                    selectedImage === index
                      ? "border-[#d4af37] shadow-[0_0_0_1px_#d4af37]"
                      : "border-white/10 hover:border-[#d4af37]/60"
                  }`}
                  aria-label={`${product.title} ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <aside className="border border-white/10 bg-[#16181f]/70 p-6 md:p-8">
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#8a8580] mb-3">
              {product.category ?? t.card.fallbackCategory}
            </p>
            <h1 className="font-[family-name:var(--font-v2-serif)] text-3xl md:text-4xl tracking-tight font-normal mb-5 text-[#f5f2ec]">
              {product.title}
            </h1>

            {!product.available && (
              <div className="mb-6">
                <span className="inline-flex px-3 py-1.5 bg-[#d4af37] text-[#0c0d10] text-[10px] tracking-[0.18em] uppercase font-semibold">
                  {t.product.soldOut}
                </span>
              </div>
            )}

            <p className="text-2xl md:text-3xl font-light mb-8 text-[#f5f2ec]">
              {formatPrice(money.amount, money.currency)}
            </p>

            <button
              onClick={() =>
                addToCart({
                  slug: product.slug,
                  title: product.title,
                  price: money.amount,
                  currency: money.currency,
                  image: images[0],
                })
              }
              disabled={!product.available}
              className="w-full mb-8 py-3.5 text-sm tracking-[0.16em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-50 bg-[#d4af37] text-[#0c0d10] font-semibold hover:bg-[#e6c558]"
            >
              {product.available ? t.product.addToCart : t.product.soldOutButton}
            </button>

            <div className="border-t border-white/10 pt-6">
              <p className="text-xs tracking-[0.2em] uppercase text-[#8a8580] mb-4">
                {t.product.info}
              </p>

              <dl className="space-y-3 text-sm leading-relaxed">
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <dt className="text-[#8a8580]">{t.product.labelDimensions}</dt>
                  <dd className="text-[#d4d0c8]">
                    {formatDimensions(product)}
                  </dd>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <dt className="text-[#8a8580]">{t.product.labelMaterials}</dt>
                  <dd className="text-[#d4d0c8]">{materials.join(", ")}</dd>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <dt className="text-[#8a8580]">{t.product.labelYear}</dt>
                  <dd className="text-[#d4d0c8]">{product.year}</dd>
                </div>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                  <dt className="text-[#8a8580]">{t.product.labelDescription}</dt>
                  <dd className="text-[#d4d0c8]">{product.description[lang]}</dd>
                </div>
              </dl>

              {extras?.length ? (
                <p className="mt-4 text-xs tracking-wide text-[#8a8580]">
                  * {extras[0]}
                </p>
              ) : null}
            </div>

            <div className="mt-8 border-t border-white/10">
              <button
                onClick={() => setOpenPolicy((current) => !current)}
                className="w-full flex items-center justify-between py-4 text-left text-sm tracking-wide text-[#ece8e1]"
              >
                <span>{t.product.policyTitle}</span>
                <span className="text-[#8a8580]">{openPolicy ? "−" : "+"}</span>
              </button>
              {openPolicy && (
                <p className="pb-4 text-sm text-[#8a8580] leading-relaxed">
                  {t.product.policyBody}
                </p>
              )}
            </div>

            <div className="border-t border-white/10">
              <button
                onClick={() => setOpenShipping((current) => !current)}
                className="w-full flex items-center justify-between py-4 text-left text-sm tracking-wide text-[#ece8e1]"
              >
                <span>{t.product.shippingTitle}</span>
                <span className="text-[#8a8580]">{openShipping ? "−" : "+"}</span>
              </button>
              {openShipping && (
                <p className="pb-1 text-sm text-[#8a8580] leading-relaxed">
                  {t.product.shippingBody}
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
