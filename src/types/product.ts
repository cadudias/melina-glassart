export interface Product {
  slug: string;
  title: string;
  description: string;
  /** Preço atual em centavos */
  price: number;
  /** Preço “de” para vitrine tipo promo (centavos), opcional */
  compareAtPrice?: number;
  currency: "USD" | "BRL";
  available: boolean;
  images: string[];
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: "cm" | "in";
  };
  materials: string[];
  year: number;
  extras?: string[];
  category?: string;
}
