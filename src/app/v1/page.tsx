import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export default function HomeV1() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        <ProductGrid products={products} />
      </main>
      <Footer />
    </>
  );
}
