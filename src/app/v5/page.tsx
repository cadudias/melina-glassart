import V5Header from "@/components/v5/V5Header";
import V5Hero from "@/components/v5/V5Hero";
import ProductGridV5 from "@/components/v5/ProductGridV5";
import V5Footer from "@/components/v5/V5Footer";
import { products } from "@/data/products";

export default function HomeV5() {
  const hero = products[0];

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <V5Header />
      <main className="pt-12 sm:pt-14">
        <div className="w-full flex flex-col gap-0">
          <V5Hero imageSrc={hero.images[0]} imageAlt={hero.title} />
          <ProductGridV5 products={products} />
        </div>
      </main>
      <V5Footer />
    </div>
  );
}
