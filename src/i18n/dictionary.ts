export type Locale = "en" | "pt";

export const LOCALES: Locale[] = ["en", "pt"];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
};

type Dict = {
  nav: {
    works: string;
    about: string;
    contact: string;
    openCart: string;
    toggleMenu: string;
    language: string;
  };
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  card: {
    fallbackCategory: string;
    soldOut: string;
    alternateView: string;
  };
  footer: {
    tagline: string;
    navigate: string;
    legal: string;
    privacy: string;
    terms: string;
    shipping: string;
    rights: string;
    instagram: string;
  };
  product: {
    breadcrumbHome: string;
    breadcrumbAll: string;
    previous: string;
    next: string;
    soldOut: string;
    addToCart: string;
    soldOutButton: string;
    info: string;
    labelTitle: string;
    labelDimensions: string;
    labelMaterials: string;
    labelYear: string;
    labelDescription: string;
    policyTitle: string;
    policyBody: string;
    shippingTitle: string;
    shippingBody: string;
  };
  cart: {
    title: string;
    itemSingular: string;
    itemPlural: string;
    empty: string;
    remove: string;
    decrease: string;
    increase: string;
    close: string;
    totalEstimated: string;
    taxesNote: string;
    checkout: string;
    redirecting: string;
    viewCart: string;
    checkoutError: string;
  };
};

export const dictionary: Record<Locale, Dict> = {
  en: {
    nav: {
      works: "Works",
      about: "About",
      contact: "Contact",
      openCart: "Open cart",
      toggleMenu: "Toggle menu",
      language: "Language",
    },
    home: {
      eyebrow: "Collection",
      title: "Works",
      subtitle:
        "Editorial showcase — focused on form and light. Handcrafted glass, one piece at a time.",
    },
    card: {
      fallbackCategory: "Piece",
      soldOut: "Sold out",
      alternateView: "alternate view",
    },
    footer: {
      tagline:
        "Handcrafted stained glass art. Each piece is unique, made with traditional techniques and contemporary vision.",
      navigate: "Navigate",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      shipping: "Shipping Info",
      rights: "All rights reserved.",
      instagram: "Instagram",
    },
    product: {
      breadcrumbHome: "Home",
      breadcrumbAll: "All Products",
      previous: "Previous",
      next: "Next",
      soldOut: "Sold out",
      addToCart: "Add to cart",
      soldOutButton: "Sold out",
      info: "Product Information",
      labelTitle: "Title:",
      labelDimensions: "Dimensions:",
      labelMaterials: "Materials:",
      labelYear: "Year:",
      labelDescription: "About:",
      policyTitle: "Returns & Exchange Policy",
      policyBody:
        "Returns within 7 days of delivery, provided the piece is undamaged and in its original packaging.",
      shippingTitle: "Shipping Information",
      shippingBody:
        "Worldwide shipping with insurance and reinforced packaging for fragile works.",
    },
    cart: {
      title: "Cart",
      itemSingular: "item",
      itemPlural: "items",
      empty: "Your cart is empty.",
      remove: "Remove",
      decrease: "Decrease quantity",
      increase: "Increase quantity",
      close: "Close cart",
      totalEstimated: "Estimated total",
      taxesNote: "Taxes and shipping are calculated at checkout.",
      checkout: "Checkout",
      redirecting: "Redirecting...",
      viewCart: "View cart",
      checkoutError: "Could not start checkout.",
    },
  },
  pt: {
    nav: {
      works: "Obras",
      about: "Sobre",
      contact: "Contato",
      openCart: "Abrir carrinho",
      toggleMenu: "Alternar menu",
      language: "Idioma",
    },
    home: {
      eyebrow: "Coleção",
      title: "Obras",
      subtitle:
        "Vitrine editorial — foco em forma e luz. Vidro feito à mão, peça por peça.",
    },
    card: {
      fallbackCategory: "Obra",
      soldOut: "Esgotado",
      alternateView: "vista alternativa",
    },
    footer: {
      tagline:
        "Arte em vitral feita à mão. Cada peça é única, criada com técnicas tradicionais e visão contemporânea.",
      navigate: "Navegação",
      legal: "Legal",
      privacy: "Política de Privacidade",
      terms: "Termos de Uso",
      shipping: "Informações de Envio",
      rights: "Todos os direitos reservados.",
      instagram: "Instagram",
    },
    product: {
      breadcrumbHome: "Início",
      breadcrumbAll: "Todos os Produtos",
      previous: "Anterior",
      next: "Próximo",
      soldOut: "Esgotado",
      addToCart: "Adicionar ao carrinho",
      soldOutButton: "Produto esgotado",
      info: "Informações do Produto",
      labelTitle: "Título:",
      labelDimensions: "Dimensões:",
      labelMaterials: "Materiais:",
      labelYear: "Ano:",
      labelDescription: "Descrição:",
      policyTitle: "Política de Troca e Devolução",
      policyBody:
        "Devoluções em até 7 dias após o recebimento, desde que a peça esteja sem danos e na embalagem original.",
      shippingTitle: "Informações de Envio",
      shippingBody:
        "Envio nacional com seguro e embalagem reforçada para obras frágeis.",
    },
    cart: {
      title: "Carrinho",
      itemSingular: "item",
      itemPlural: "itens",
      empty: "Seu carrinho está vazio.",
      remove: "Remover",
      decrease: "Diminuir quantidade",
      increase: "Aumentar quantidade",
      close: "Fechar carrinho",
      totalEstimated: "Total estimado",
      taxesNote: "Impostos e frete são calculados no checkout.",
      checkout: "Finalizar compra",
      redirecting: "Redirecionando...",
      viewCart: "Ver carrinho",
      checkoutError: "Erro ao iniciar checkout.",
    },
  },
};
