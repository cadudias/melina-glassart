import { Product } from "@/types/product";

const coreStaticImages = [
  "/images/core-static/01.jpg", // capa (homepage)
  "/images/core-static/02.jpg", // hover
  "/images/core-static/03.jpg",
  "/images/core-static/04.jpg",
  "/images/core-static/05.jpg",
  "/images/core-static/06.jpg",
  "/images/core-static/07.jpg",
  "/images/core-static/08.jpg",
  "/images/core-static/09.jpg",
  "/images/core-static/10.jpg",
  "/images/core-static/11.jpg",
  "/images/core-static/12.jpg",
  "/images/core-static/13.jpg",
];

const coreBloomImages = [
  "/images/core-bloom/01.jpg", // capa (homepage)
  "/images/core-bloom/02.jpg", // hover
  "/images/core-bloom/03.jpg",
  "/images/core-bloom/04.jpg",
  "/images/core-bloom/05.jpg",
  "/images/core-bloom/07.jpg",
  "/images/core-bloom/08.jpg",
  "/images/core-bloom/09.jpg",
  "/images/core-bloom/10.jpg",
  "/images/core-bloom/11.jpg",
  "/images/core-bloom/12.jpg",
  "/images/core-bloom/13.jpg",
  "/images/core-bloom/14.jpg",
];

// US$ 300 (en) / R$ 1.500 (pt-BR) — valores em centavos
const corePrice = {
  en: { amount: 30000, currency: "USD" as const },
  pt: { amount: 150000, currency: "BRL" as const },
};

const coreMaterials = {
  en: [
    "Recycled hand-painted glass",
    "Recycled hand-engraved mirror",
    "60/40 solder",
    "Braided fabric cord with inline switch",
    "40W LED bulb",
  ],
  pt: [
    "Vidro reciclado pintado à mão",
    "Espelho reciclado gravado à mão",
    "Solda 60/40",
    "Cabo de tecido trançado com interruptor",
    "Lâmpada LED 40W",
  ],
};

const coreExtras = {
  en: ["Approx. weight: 500g — carefully packed for safe shipment"],
  pt: ["Peso aproximado: 500g — embalado com cuidado para envio seguro"],
};

export const products: Product[] = [
  {
    slug: "core-006-static",
    title: "Core 006: Static",
    description: {
      en: "Core 006: Static (2026) by Melina Vaz is part of the Core series, a collection of artifacts imagined as analog cores for fictional digital systems. Built from 38 pieces of glass and mirror, individually cut, painted, engraved, and soldered by hand, each Core embodies a different form of energy incorporated throughout the making process. Static explores electricity: vibrant colors, circuit-inspired drawings, reflections, and light come together to create an object that exists somewhere between relic, device, and luminous toy. When illuminated, it conveys a vibrant tension, like static electricity.",
      pt: "Core 006: Static (2026), de Melina Vaz, faz parte da série Core — uma coleção de artefatos imaginados como núcleos analógicos de sistemas digitais fictícios. Construído a partir de 38 peças de vidro e espelho, individualmente cortadas, pintadas, gravadas e soldadas à mão, cada Core incorpora uma forma diferente de energia ao longo do processo de criação. Static explora a eletricidade: cores vibrantes, desenhos inspirados em circuitos, reflexos e luz se combinam para criar um objeto que existe em algum lugar entre relíquia, dispositivo e brinquedo luminoso. Ao acender, transmite uma tensão vibrante, como eletricidade estática.",
    },
    price: corePrice,
    available: true,
    images: coreStaticImages,
    cardImages: [
      "/images/core-static/01-card.jpg",
      "/images/core-static/02-card.jpg",
    ],
    dimensions: { width: 10, height: 10, depth: 10, unit: "cm" },
    materials: coreMaterials,
    year: 2026,
    extras: coreExtras,
    category: "Core",
  },
  {
    slug: "core-010-bloom",
    title: "Core 010: Bloom",
    description: {
      en: "Core 010: Bloom (2026) by Melina Vaz is part of the Core series, a collection of artifacts imagined as analog cores for fictional digital systems. Built from 38 pieces of glass and mirror, individually cut, painted, engraved, and soldered by hand, each Core embodies a different form of energy incorporated throughout the making process. Built from glass, metal, and digital references, Bloom initially appears technical and structured. Yet, as light passes through the piece, those qualities dissolve into something unexpectedly warm — a core shaped by imagination, tenderness, and the slow process of flourishing.",
      pt: "Core 010: Bloom (2026), de Melina Vaz, faz parte da série Core — uma coleção de artefatos imaginados como núcleos analógicos de sistemas digitais fictícios. Construído a partir de 38 peças de vidro e espelho, individualmente cortadas, pintadas, gravadas e soldadas à mão, cada Core incorpora uma forma diferente de energia ao longo do processo de criação. Construído a partir de vidro, metal e referências digitais, Bloom inicialmente parece técnico e estruturado. Porém, à medida que a luz atravessa a peça, essas características se dissolvem em algo inesperadamente acolhedor — um núcleo moldado pela imaginação, pela delicadeza e pelo lento processo de florescimento.",
    },
    price: corePrice,
    available: true,
    images: coreBloomImages,
    cardImages: [
      "/images/core-bloom/01-card.jpg",
      "/images/core-bloom/02-card.jpg",
    ],
    dimensions: { width: 10, height: 10, depth: 10, unit: "cm" },
    materials: coreMaterials,
    year: 2026,
    extras: coreExtras,
    category: "Core",
  },
];
