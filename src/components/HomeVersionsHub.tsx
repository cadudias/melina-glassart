"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const versions = [
  {
    href: "/v1",
    label: "Versão 1",
    title: "Clássica",
    description:
      "Grid claro, tipografia Geist, acento terroso — a listagem que você já usa hoje.",
    accent: "from-amber-50/80 to-transparent",
  },
  {
    href: "/v2",
    label: "Versão 2",
    title: "Editorial",
    description:
      "Fundo escuro, serif + sans, ouro e ritmo de revista — só a vitrine, novo olhar.",
    accent: "from-stone-900/40 to-transparent",
  },
  {
    href: "/v3",
    label: "Versão 3",
    title: "Vitrail",
    description:
      "Cores sol e folha, pastilhas e bordas tipo chumbo — inspirado no seu vitral, com equilíbrio.",
    accent: "from-amber-200/90 via-teal-200/50 to-fuchsia-200/60",
  },
  {
    href: "/v4",
    label: "Versão 4",
    title: "Loja",
    description:
      "Layout tipo joalheria: barra verde, busca, logo central, menu caps, grade 4 colunas e ofertas.",
    accent: "from-emerald-100/90 to-white",
  },
  {
    href: "/v5",
    label: "Versão 5",
    title: "Masonry",
    description:
      "Fundo preto, grade 2 colunas sem gap, imagens em alturas variadas e texto branco discreto.",
    accent: "from-neutral-800 to-black",
  },
] as const;

export default function HomeVersionsHub() {
  return (
    <main className="flex-1 flex flex-col justify-center min-h-[calc(100dvh-4rem)] pt-20 md:pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 md:px-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-16"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-muted mb-4">
            Melina Glass Art
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-foreground mb-4">
            Escolha uma versão do site
          </h1>
          <p className="text-muted text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Compare as vitrines: clássica, editorial, vitrail, loja boutique e parede
            escura estilo galeria.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {versions.map((v, i) => (
            <motion.div
              key={v.href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <Link
                href={v.href}
                className="group block h-full rounded-2xl border border-border/80 bg-surface overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:border-accent/40 hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`h-2 bg-gradient-to-r ${v.accent} via-border/30 to-transparent`}
                />
                <div className="p-8 md:p-10">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-accent">
                    {v.label}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-light mt-2 mb-3 group-hover:text-accent transition-colors">
                    {v.title}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {v.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm tracking-wide text-foreground group-hover:gap-3 transition-all">
                    Abrir vitrine
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
