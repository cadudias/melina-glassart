import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetailView from "@/components/ProductDetailView";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = products.findIndex((product) => product.slug === slug);

  if (index === -1) {
    notFound();
  }

  const product = products[index];
  const previousProduct = products[(index - 1 + products.length) % products.length];
  const nextProduct = products[(index + 1) % products.length];

  return (
    <>
      <Header />
      <ProductDetailView
        product={product}
        previousProduct={previousProduct}
        nextProduct={nextProduct}
      />
      <Footer />
    </>
  );
}
