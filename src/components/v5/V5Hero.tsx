import Image from "next/image";
import Link from "next/link";

export default function V5Hero({ imageSrc, imageAlt }: { imageSrc: string; imageAlt: string }) {
  return (
    <section className="flex flex-col-reverse lg:flex-row w-full gap-0 lg:min-h-[calc(100dvh-3.5rem)] border-b border-white/[0.07]">
      {/* Bloco escuro — mesma largura relativa da ref (~40%) */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center bg-black px-6 sm:px-8 lg:px-10 xl:pl-12 py-14 lg:py-16 shrink-0">
        <p className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-white/45 mb-5">
          Melina Glass Art
        </p>
        <h1 className="text-[1.75rem] sm:text-3xl lg:text-[2.35rem] xl:text-[2.6rem] font-light tracking-tight text-white leading-[1.12] mb-5">
          Luz, cor
          <br />
          e vidro
        </h1>
        <p className="text-sm text-white/50 leading-relaxed max-w-[28ch] mb-8">
          Vitrais e peças de mesa, cada uma única. Role para a parede de obras —
          sem espaço entre a hero e a galeria.
        </p>
        <Link
          href="#obras"
          className="inline-flex w-fit text-[11px] tracking-[0.25em] uppercase text-white border border-white/25 px-5 py-3 hover:bg-white hover:text-black transition-colors"
        >
          Ver obras
        </Link>
      </div>

      {/* Imagem — ~60%, colada à hero e à grade */}
      <div className="relative w-full lg:w-[60%] min-h-[42vh] sm:min-h-[48vh] lg:min-h-0 lg:flex-1">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </div>
    </section>
  );
}
