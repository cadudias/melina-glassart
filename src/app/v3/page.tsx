import Header from "@/components/Header";
import ProductGridV3 from "@/components/ProductGridV3";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export default function HomeV3() {
  return (
    <>
      <Header variant="vitrail" />
      <main className="flex-1 pt-20 md:pt-24">
        <ProductGridV3 products={products} />
      </main>
      <Footer variant="vitrail" />
    </>
  );
}
