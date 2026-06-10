import Header from "@/components/Header";
import ProductGridV2 from "@/components/ProductGridV2";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export default function Home() {
  return (
    <div className="min-h-full bg-[#0c0d10] text-[#ece8e1] font-[family-name:var(--font-v2-sans)]">
      <Header variant="dark" />
      <main className="flex-1 pt-20 md:pt-24">
        <ProductGridV2 products={products} />
      </main>
      <Footer variant="dark" />
    </div>
  );
}
