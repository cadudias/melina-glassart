import { Product } from "@/types/product";
import ProductCardV5 from "./ProductCardV5";

export default function ProductGridV5({ products }: { products: Product[] }) {
  return (
    <div id="obras" className="grid grid-cols-2 gap-0 w-full scroll-mt-[3.5rem]">
      {products.map((product, index) => (
        <ProductCardV5 key={product.slug} product={product} index={index} />
      ))}
    </div>
  );
}
