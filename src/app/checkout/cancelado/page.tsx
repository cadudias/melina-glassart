import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CheckoutCanceledPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-24 md:pt-28 pb-20">
        <section className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="border border-border/70 bg-surface p-8 md:p-10">
            <p className="text-xs tracking-[0.2em] uppercase text-muted mb-4">
              Pagamento cancelado
            </p>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
              Seu checkout foi cancelado
            </h1>
            <p className="text-muted leading-relaxed mb-8">
              Sem problemas. Seus itens continuam no carrinho para você finalizar
              quando quiser.
            </p>
            <Link
              href="/"
              className="inline-flex px-6 py-3 border border-accent text-accent hover:bg-surface-hover transition-colors"
            >
              Voltar para a loja
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
