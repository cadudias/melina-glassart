"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartProvider";

type HeaderProps = {
  variant?: "light" | "dark" | "vitrail";
};

export default function Header({ variant = "light" }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  const isDark = variant === "dark";
  const isVitrail = variant === "vitrail";

  return (
    <header
      className={
        isDark
          ? "fixed top-0 left-0 right-0 z-40 bg-[#0c0d10]/90 backdrop-blur-md border-b border-white/10"
          : isVitrail
            ? "fixed top-0 left-0 right-0 z-40 bg-[#fffdf8]/92 backdrop-blur-md border-b-2 border-stone-800/12"
            : "fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50"
      }
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <span
            className={
              isDark
                ? "text-lg tracking-[0.2em] uppercase font-light text-stone-100 group-hover:text-[#d4af37] transition-colors duration-300"
                : isVitrail
                  ? "text-lg tracking-[0.2em] uppercase font-light text-stone-900 group-hover:text-amber-800 transition-colors duration-300"
                  : "text-lg tracking-[0.2em] uppercase font-light text-foreground group-hover:text-accent transition-colors duration-300"
            }
          >
            Melina Glass Art
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/v1"
            className={
              isDark
                ? "text-sm tracking-wider uppercase text-stone-400 hover:text-stone-100 transition-colors duration-300"
                : isVitrail
                  ? "text-sm tracking-wider uppercase text-stone-700 hover:text-teal-900 transition-colors duration-300"
                  : "text-sm tracking-wider uppercase text-muted hover:text-foreground transition-colors duration-300"
            }
          >
            Works
          </Link>
          <Link
            href="/about"
            className={
              isDark
                ? "text-sm tracking-wider uppercase text-stone-400 hover:text-stone-100 transition-colors duration-300"
                : isVitrail
                  ? "text-sm tracking-wider uppercase text-stone-700 hover:text-teal-900 transition-colors duration-300"
                  : "text-sm tracking-wider uppercase text-muted hover:text-foreground transition-colors duration-300"
            }
          >
            About
          </Link>
          <Link
            href="/contact"
            className={
              isDark
                ? "text-sm tracking-wider uppercase text-stone-400 hover:text-stone-100 transition-colors duration-300"
                : isVitrail
                  ? "text-sm tracking-wider uppercase text-stone-700 hover:text-teal-900 transition-colors duration-300"
                  : "text-sm tracking-wider uppercase text-muted hover:text-foreground transition-colors duration-300"
            }
          >
            Contact
          </Link>
          <button
            onClick={openCart}
            className={
              isDark
                ? "relative p-2 text-stone-400 hover:text-stone-100 transition-colors"
                : isVitrail
                  ? "relative p-2 text-stone-600 hover:text-amber-900 transition-colors"
                  : "relative p-2 text-muted hover:text-foreground transition-colors"
            }
            aria-label="Abrir carrinho"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
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
              <span
                className={
                  isDark
                    ? "absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#d4af37] text-[#0c0d10] text-[11px] leading-5 text-center font-medium"
                    : isVitrail
                      ? "absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-stone-900 text-[11px] leading-5 text-center font-semibold shadow-sm"
                      : "absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-accent text-white text-[11px] leading-5 text-center"
                }
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={openCart}
            className={
              isDark
                ? "relative p-2 text-stone-400 hover:text-stone-100 transition-colors"
                : isVitrail
                  ? "relative p-2 text-stone-600 hover:text-amber-900 transition-colors"
                  : "relative p-2 text-muted hover:text-foreground transition-colors"
            }
            aria-label="Abrir carrinho"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
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
              <span
                className={
                  isDark
                    ? "absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#d4af37] text-[#0c0d10] text-[11px] leading-5 text-center font-medium"
                    : isVitrail
                      ? "absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-stone-900 text-[11px] leading-5 text-center font-semibold shadow-sm"
                      : "absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-accent text-white text-[11px] leading-5 text-center"
                }
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={
                isDark
                  ? "block w-6 h-px bg-stone-100 origin-center"
                  : isVitrail
                    ? "block w-6 h-px bg-stone-800 origin-center"
                    : "block w-6 h-px bg-foreground origin-center"
              }
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className={
                isDark
                  ? "block w-6 h-px bg-stone-100"
                  : isVitrail
                    ? "block w-6 h-px bg-stone-800"
                    : "block w-6 h-px bg-foreground"
              }
              transition={{ duration: 0.15 }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={
                isDark
                  ? "block w-6 h-px bg-stone-100 origin-center"
                  : isVitrail
                    ? "block w-6 h-px bg-stone-800 origin-center"
                    : "block w-6 h-px bg-foreground origin-center"
              }
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className={
              isDark
                ? "md:hidden overflow-hidden border-b border-white/10 bg-[#0c0d10]/98 backdrop-blur-md"
                : isVitrail
                  ? "md:hidden overflow-hidden border-b-2 border-stone-800/10 bg-[#fffdf8]/98 backdrop-blur-md"
                  : "md:hidden overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur-md"
            }
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {["Works", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={item === "Works" ? "/v1" : `/${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className={
                    isDark
                      ? "text-sm tracking-wider uppercase text-stone-400 hover:text-stone-100 transition-colors duration-300"
                      : isVitrail
                        ? "text-sm tracking-wider uppercase text-stone-700 hover:text-amber-900 transition-colors duration-300"
                        : "text-sm tracking-wider uppercase text-muted hover:text-foreground transition-colors duration-300"
                  }
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
