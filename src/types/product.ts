import type { Locale } from "@/i18n/dictionary";

export type Currency = "USD" | "BRL";

/** Texto traduzido por idioma. */
export type LocalizedText = Record<Locale, string>;
/** Lista de textos traduzida por idioma. */
export type LocalizedList = Record<Locale, string[]>;

/** Valor monetário em centavos + moeda. */
export interface Money {
  /** Valor em centavos */
  amount: number;
  currency: Currency;
}

/** Preço traduzido por idioma (cada idioma com sua moeda). */
export type LocalizedPrice = Record<Locale, Money>;

export interface Product {
  slug: string;
  title: string;
  description: LocalizedText;
  /** Preço atual por idioma/moeda */
  price: LocalizedPrice;
  /** Preço “de” para vitrine tipo promo, opcional */
  compareAtPrice?: LocalizedPrice;
  available: boolean;
  images: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: "cm" | "in";
  };
  materials: LocalizedList;
  year: number;
  extras?: LocalizedList;
  category?: string;
}
