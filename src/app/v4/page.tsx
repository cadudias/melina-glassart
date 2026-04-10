import BoutiqueShop from "@/components/v4/BoutiqueShop";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export default function HomeV4() {
  return (
    <>
      <BoutiqueShop products={products} />
      <Footer />
    </>
  );
}
