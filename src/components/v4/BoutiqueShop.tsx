"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Product } from "@/types/product";
import ProductCardBoutique from "./ProductCardBoutique";

const NAV = [
  { label: "Novidades", href: "/v1" },
  { label: "Editorial", href: "/v2" },
  { label: "Vitrail", href: "/v3" },
  { label: "Loja", href: "/v4" },
  { label: "Sobre", href: "/about" },
  { label: "Contato", href: "/contact" },
] as const;

type SortKey = "featured" | "name-asc" | "name-desc" | "price-asc" | "price-desc";

function sortProducts(list: Product[], key: SortKey): Product[] {
  const copy = [...list];
  switch (key) {
    case "name-asc":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return copy.sort((a, b) => b.title.localeCompare(a.title));
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    default:
      return copy;
  }
}

export default function BoutiqueShop({ products }: { products: Product[] }) {
  const { totalItems, openCart } = useCart();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.category?.toLowerCase().includes(q) ?? false),
    );
  }, [products, query]);

  const sorted = useMemo(
    () => sortProducts(filtered, sort),
    [filtered, sort],
  );

  const total = sorted.length;
  const start = total === 0 ? 0 : 1;
  const end = total;

  return (
    <div className="bg-white text-neutral-900 min-h-screen text-[15px] sm:text-base">
      {/* Barra tipo e-commerce */}
      <div className="bg-emerald-950 text-white text-center text-xs sm:text-sm tracking-[0.12em] uppercase py-2.5 px-4">
        Pagamento seguro com Stripe · frete e impostos no checkout
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200/80">
        <div className="w-full px-4 sm:px-5 md:px-6">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-5 md:py-6">
            <div className="justify-self-start min-w-0 w-full max-w-[200px] md:max-w-xs">
              <label className="sr-only" htmlFor="boutique-search">
                Buscar obras
              </label>
              <input
                id="boutique-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar obras…"
                className="w-full rounded-none border border-neutral-300 bg-white px-3 py-2.5 text-base text-neutral-800 placeholder:text-neutral-400 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800/30"
              />
            </div>

            <Link
              href="/"
              className="justify-self-center text-center font-[family-name:var(--font-boutique-serif)] text-3xl sm:text-4xl md:text-[2.35rem] tracking-[0.02em] text-neutral-900 hover:text-emerald-900 transition-colors"
            >
              MELINA
            </Link>

            <div className="justify-self-end flex items-center gap-1 sm:gap-3">
              <Link
                href="/about"
                className="p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                aria-label="Conta"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M20 21a8 8 0 1 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
              <button
                type="button"
                onClick={openCart}
                className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
                aria-label="Carrinho"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M6 7V6a6 6 0 1 1 12 0v1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4 7h16l-1.1 13H5.1L4 7Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-700 text-white text-[10px] font-medium leading-[18px] text-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 pb-4 border-t border-neutral-100 pt-4">
            {NAV.map((item) => {
              const isActive = item.href === "/v4";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-xs tracking-[0.2em] uppercase transition-colors ${
                    isActive
                      ? "text-emerald-900 font-medium border-b border-emerald-800 pb-0.5"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="w-full px-4 sm:px-5 md:px-6 pb-20 pt-8 md:pt-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 md:mb-12">
          <h1 className="font-[family-name:var(--font-boutique-serif)] text-4xl md:text-5xl text-neutral-900 tracking-tight">
            Obras
          </h1>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <label className="flex items-center gap-2 text-base text-neutral-600">
              <span className="whitespace-nowrap">Ordenar</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-neutral-300 bg-white px-3 py-2.5 text-base text-neutral-900 focus:border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-800/25 min-w-[180px]"
              >
                <option value="featured">Em destaque</option>
                <option value="name-asc">Nome A–Z</option>
                <option value="name-desc">Nome Z–A</option>
                <option value="price-asc">Menor preço</option>
                <option value="price-desc">Maior preço</option>
              </select>
            </label>
            <p className="text-base text-neutral-500 tabular-nums">
              {total === 0
                ? "Nenhuma obra"
                : `${start}–${end} de ${total} ${total === 1 ? "obra" : "obras"}`}
            </p>
          </div>
        </div>

        {total === 0 ? (
          <p className="text-neutral-500 text-center text-base py-20">
            Nenhum resultado para “{query}”.{" "}
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-emerald-800 underline underline-offset-2"
            >
              Limpar busca
            </button>
          </p>
        ) : (
          <div
            className="grid w-full gap-x-5 gap-y-10 sm:gap-x-6 md:gap-y-12 [grid-template-columns:repeat(auto-fill,minmax(min(100%,450px),1fr))]"
          >
            {sorted.map((product) => (
              <ProductCardBoutique key={product.slug} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
