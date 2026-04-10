import Header from "@/components/Header";
import ProductGridV2 from "@/components/ProductGridV2";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export default function HomeV2() {
  return (
    <>
      <Header variant="dark" />
      <main className="flex-1 pt-20 md:pt-24">
        <ProductGridV2 products={products} />
      </main>
      <Footer variant="dark" />
    </>
  );
}
