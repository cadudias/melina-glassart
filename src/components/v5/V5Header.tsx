"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function V5Header() {
  const { totalItems, openCart } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="w-full flex items-center justify-between px-4 sm:px-6 h-12 sm:h-14">
        <Link
          href="/"
          className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
        >
          Versões
        </Link>

        <Link
          href="/"
          className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white font-light"
        >
          Melina Glass Art
        </Link>

        <button
          type="button"
          onClick={openCart}
          className="relative p-1.5 text-white/80 hover:text-white transition-colors"
          aria-label="Carrinho"
        >
          <svg
            width="20"
            height="20"
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
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 rounded-full bg-white text-black text-[9px] font-semibold leading-4 text-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
