"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/components/CartProvider";

function formatPrice(cents: number, currency: Product["currency"]): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(cents / 100);
}

function formatDimensions(product: Product): string {
  const { width, height, depth, unit } = product.dimensions;
  return `${width} x ${height} x ${depth} ${unit}`;
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

  const images = useMemo(
    () => (product.images.length > 0 ? product.images : ["/placeholder.jpg"]),
    [product.images],
  );

  return (
    <main className="flex-1 pt-24 md:pt-28 pb-16">
      <section className="max-w-[1760px] mx-auto px-5 md:px-8 xl:px-10">
        <div className="mb-8 flex items-center justify-between gap-4 text-xs tracking-wider">
          <div className="flex items-center gap-2 text-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-foreground transition-colors">
              Todos os Produtos
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/product/${previousProduct.slug}`}
              className="text-muted hover:text-foreground transition-colors"
            >
              &lt; Anterior
            </Link>
            <span className="text-border">|</span>
            <Link
              href={`/product/${nextProduct.slug}`}
              className="text-muted hover:text-foreground transition-colors"
            >
              Próximo &gt;
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] gap-10 xl:gap-14 items-start">
          <div>
            <div className="relative aspect-square w-full overflow-hidden border border-border/70 bg-surface">
              <Image
                src={images[selectedImage]}
                alt={product.title}
                fill
                sizes="(max-width: 1280px) 100vw, 65vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-4 flex items-center gap-2.5">
              {images.map((image, index) => (
                <button
                  key={`${product.slug}-thumb-${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-14 w-14 overflow-hidden border transition-all ${
                    selectedImage === index
                      ? "border-accent shadow-[0_0_0_1px_var(--accent)]"
                      : "border-border/70 hover:border-accent/60"
                  }`}
                  aria-label={`Selecionar imagem ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} miniatura ${index + 1}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {product.extras?.length ? (
              <p className="mt-4 text-xs tracking-wide text-muted">
                * {product.extras[0]}
              </p>
            ) : null}
          </div>

          <aside className="border border-border/70 bg-surface/70 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl tracking-tight font-light mb-5">
              {product.title}
            </h1>

            <div className="mb-6">
              {!product.available && (
                <span className="inline-flex px-3.5 py-1.5 bg-accent text-white text-[10px] tracking-[0.18em] uppercase font-medium border border-accent-dim shadow-[0_8px_20px_rgba(169,108,57,0.35)]">
                  Esgotado
                </span>
              )}
            </div>

            <p className="text-2xl md:text-3xl font-light mb-8">
              {formatPrice(product.price, product.currency)}
            </p>

            <button
              onClick={() =>
                addToCart({
                  slug: product.slug,
                  title: product.title,
                  price: product.price,
                  currency: product.currency,
                  image: images[0],
                })
              }
              disabled={!product.available}
              className="w-full mb-8 py-3.5 border text-sm tracking-[0.16em] uppercase transition-colors disabled:cursor-not-allowed disabled:opacity-55 border-accent bg-accent text-white hover:bg-accent-dim hover:border-accent-dim"
            >
              {product.available ? "Adicionar ao carrinho" : "Produto esgotado"}
            </button>

            <div className="border-t border-border/70 pt-6">
              <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
                Informações do Produto
              </p>

              <dl className="space-y-3 text-sm leading-relaxed">
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <dt className="text-muted">Título:</dt>
                  <dd>{product.title}</dd>
                </div>
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <dt className="text-muted">Dimensões:</dt>
                  <dd>{formatDimensions(product)}</dd>
                </div>
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <dt className="text-muted">Materiais:</dt>
                  <dd>{product.materials.join(", ")}</dd>
                </div>
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <dt className="text-muted">Ano:</dt>
                  <dd>{product.year}</dd>
                </div>
                <div className="grid grid-cols-[90px_1fr] gap-2">
                  <dt className="text-muted">Descrição:</dt>
                  <dd>{product.description}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 border-t border-border/70">
              <button
                onClick={() => setOpenPolicy((current) => !current)}
                className="w-full flex items-center justify-between py-4 text-left text-sm tracking-wide"
              >
                <span>Política de Troca e Devolução</span>
                <span className="text-muted">{openPolicy ? "-" : "+"}</span>
              </button>
              {openPolicy && (
                <p className="pb-4 text-sm text-muted leading-relaxed">
                  Devolucoes em ate 7 dias apos o recebimento, desde que a peca
                  esteja sem danos e na embalagem original.
                </p>
              )}
            </div>

            <div className="border-t border-border/70">
              <button
                onClick={() => setOpenShipping((current) => !current)}
                className="w-full flex items-center justify-between py-4 text-left text-sm tracking-wide"
              >
                <span>Informações de Envio</span>
                <span className="text-muted">{openShipping ? "-" : "+"}</span>
              </button>
              {openShipping && (
                <p className="pb-1 text-sm text-muted leading-relaxed">
                  Envio nacional com seguro e embalagem reforcada para obras
                  frageis.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
