# Melina Glass Art - Planejamento do E-commerce

## 1. Visao Geral do Projeto

Site e-commerce simples para venda de pecas de arte em vidro (stained glass). O site deve ser elegante, com fundo escuro, focado na apresentacao visual dos produtos. O pagamento sera processado fora do site via checkout de terceiros (Stripe), com suporte a pagamentos internacionais (cartao, Apple Pay, Google Pay) e brasileiros (PIX, boleto via Stripe Brasil).

---

## 2. Paginas e Funcionalidades

### 2.1 Pagina Inicial (Home)

#### Hero Section
- Banner grande com imagem de destaque ou slideshow
- Nome da marca "Melina Glass Art" em evidencia
- Tagline curta sobre o trabalho artesanal
- CTA (call-to-action) para a secao de produtos

#### Grid de Produtos
- Layout em grid responsivo (3-4 colunas desktop, 2 tablet, 1 mobile)
- Cada card mostra:
  - Imagem principal do produto (fundo escuro)
  - Nome do produto
  - Preco (com seletor de moeda: BRL / USD / CAD / EUR)
  - Status (disponivel / vendido)
- **Hover effect**: ao passar o mouse, a imagem principal troca para uma segunda foto do produto (ex: outro angulo, detalhe) com transicao suave (CSS transition/fade)
- Click leva para a pagina de detalhes

### 2.2 Pagina de Detalhes do Produto

#### Galeria de Imagens
- Imagem principal grande
- Thumbnails abaixo para navegar entre fotos (minimo 2-3 fotos por produto)
- Click no thumbnail troca a imagem principal
- Opcional: zoom on hover ou lightbox para ver em tela cheia

#### Informacoes do Produto
- Titulo
- Preco com moeda selecionada
- Descricao/tecnica
- Dimensoes (largura x altura x profundidade)
- Materiais utilizados
- Ano de criacao
- Informacoes extras (ex: "Signed archival print included")

#### Secoes Expansiveis (accordion)
- **Return & Refund Policy**
- **Shipping Info** (nacional e internacional)

#### Botao de Acao
- "Add to Cart" (se disponivel)
- "Sold Out" (desabilitado, se vendido)
- Navegacao Prev/Next entre produtos

### 2.3 Carrinho de Compras

- Sidebar ou pagina dedicada
- Lista de itens adicionados com imagem, nome, preco
- Remover itens
- Total com conversao de moeda
- Botao "Checkout" que redireciona para o Stripe Checkout (pagamento externo)

### 2.4 Paginas Complementares

- **Sobre/About**: historia da artista e do trabalho
- **Contato**: formulario simples ou link para email/Instagram
- **Politica de Privacidade**: obrigatoria para LGPD/GDPR
- **Termos de Uso**

---

## 3. Arquitetura Tecnica

### 3.1 Stack Recomendada

| Camada       | Tecnologia                     | Justificativa                                      |
|--------------|--------------------------------|-----------------------------------------------------|
| Frontend     | Next.js (App Router) + React   | SSR/SSG para SEO, performance, e simplicidade       |
| Estilizacao  | Tailwind CSS                   | Rapido de prototipar, design system consistente      |
| Backend/API  | Next.js API Routes             | Sem servidor separado, tudo no mesmo deploy          |
| Database     | Nenhuma (dados em JSON/CMS)    | Catalogo pequeno, nao precisa de DB complexo         |
| CMS          | Arquivos JSON ou Markdown      | Artista atualiza produtos via arquivos simples       |
| Pagamento    | Stripe Checkout (hosted)       | Pagamento fora do site - seguranca maxima            |
| Hospedagem   | Vercel                         | Deploy automatico, HTTPS gratis, CDN global          |
| Imagens      | Vercel Image Optimization      | Otimizacao automatica, lazy loading, WebP            |

### 3.2 Estrutura de Pastas

```
melina-glassart/
├── public/
│   └── images/
│       └── products/         # fotos dos produtos
├── src/
│   ├── app/
│   │   ├── layout.tsx        # layout global (header, footer)
│   │   ├── page.tsx          # home (hero + grid)
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # detalhe do produto
│   │   ├── cart/
│   │   │   └── page.tsx      # carrinho
│   │   ├── api/
│   │   │   └── checkout/
│   │   │       └── route.ts  # cria sessao Stripe
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx   # card com hover effect
│   │   ├── ProductGallery.tsx
│   │   ├── CartSidebar.tsx
│   │   ├── CurrencySelector.tsx
│   │   └── Accordion.tsx
│   ├── data/
│   │   └── products.json     # catalogo de produtos
│   ├── lib/
│   │   ├── stripe.ts         # config Stripe server-side
│   │   └── cart.ts           # logica do carrinho (zustand ou context)
│   └── types/
│       └── product.ts        # tipagem TypeScript
├── .env.local                # STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

### 3.3 Modelo de Dados do Produto

```typescript
interface Product {
  slug: string;            // URL amigavel: "pitcher-index"
  title: string;           // "Pitcher Index"
  description: string;     // descricao longa
  price: number;           // preco em centavos (USD base)
  priceBRL: number;        // preco em centavos (BRL)
  currency: "USD" | "BRL"; // moeda base
  available: boolean;      // disponivel ou vendido
  images: string[];        // array de caminhos das imagens
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: "cm" | "in";
  };
  materials: string[];     // ["Stained Glass", "Mirror", "Solder"]
  year: number;            // 2025
  extras?: string[];       // ["Signed archival print included"]
  category?: string;       // para filtros futuros
}
```

---

## 4. Fluxo de Pagamento (Stripe Checkout)

### 4.1 Por que Stripe Checkout Hosted?

- **Dados de cartao NUNCA passam pelo nosso servidor** - Stripe cuida de tudo
- Conformidade PCI DSS automatica (SAQ A - nivel mais simples)
- Suporte nativo a multiplas moedas
- Suporte a metodos brasileiros (PIX, boleto) via Stripe Brasil
- Apple Pay, Google Pay, Link integrados automaticamente
- Pagina de checkout otimizada para conversao

### 4.2 Fluxo

```
[Site] Usuario adiciona ao carrinho
  │
  ▼
[Site] Usuario clica "Checkout"
  │
  ▼
[API Route] POST /api/checkout
  │  → Cria Stripe Checkout Session com os itens do carrinho
  │  → Define success_url e cancel_url
  │
  ▼
[Redirect] Usuario e redirecionado para checkout.stripe.com
  │  → Insere dados de pagamento no ambiente seguro do Stripe
  │  → Escolhe metodo: cartao, PIX, boleto, Apple Pay, etc.
  │
  ▼
[Stripe] Processa o pagamento
  │
  ▼
[Redirect] Usuario volta para success_url no nosso site
  │
  ▼
[Webhook] Stripe envia webhook para /api/webhook
  │  → Confirma pagamento
  │  → Atualiza status do produto (opcional: marca como vendido)
  │  → Envia email de confirmacao
```

### 4.3 Configuracao Stripe

```typescript
// POST /api/checkout/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { items, currency } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: currency === 'brl'
      ? ['card', 'boleto', 'pix']
      : ['card'],
    line_items: items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price, // em centavos
      },
      quantity: 1,
    })),
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    shipping_address_collection: {
      allowed_countries: ['BR', 'US', 'CA', 'GB', 'DE', 'FR', 'PT', 'ES'],
    },
  });

  return Response.json({ url: session.url });
}
```

---

## 5. Seguranca

### 5.1 Protecao de Dados do Usuario

| Medida                          | Implementacao                                           |
|---------------------------------|---------------------------------------------------------|
| HTTPS obrigatorio               | Vercel fornece SSL/TLS automatico                       |
| Sem armazenamento de cartao     | Stripe Checkout hosted - dados nunca tocam nosso server |
| PCI DSS compliance              | SAQ A via Stripe (nivel mais simples e seguro)          |
| Variaveis de ambiente           | .env.local para chaves, NUNCA commitadas no git         |
| Validacao de webhook            | Verificar assinatura do Stripe em cada webhook          |
| CORS restrito                   | Apenas dominio proprio nas API routes                   |
| Rate limiting                   | Middleware no /api/checkout para evitar abuso            |
| Content Security Policy (CSP)   | Headers restritivos no next.config.js                   |
| Sanitizacao de input            | Validar todos os dados antes de enviar ao Stripe        |

### 5.2 Verificacao de Webhook (Stripe)

```typescript
// POST /api/webhook/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return new Response('Webhook signature verification failed', { status: 400 });
  }

  // Processar evento com seguranca
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Atualizar status do pedido, enviar email, etc.
  }

  return new Response('OK', { status: 200 });
}
```

### 5.3 Headers de Seguranca (next.config.js)

```javascript
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' js.stripe.com; frame-src js.stripe.com; img-src 'self' data: *.stripe.com; connect-src 'self' api.stripe.com;"
  },
];
```

### 5.4 LGPD / GDPR

- Banner de cookies com consentimento explicito
- Politica de privacidade detalhando:
  - Quais dados sao coletados (nome, email, endereco de entrega)
  - Que dados de pagamento sao processados pelo Stripe (nao por nos)
  - Direito de exclusao de dados
  - Contato do responsavel
- Nao coletar dados desnecessarios
- Nao usar analytics invasivos (preferir Plausible ou simples page views)

### 5.5 .gitignore (Seguranca de Repositorio)

```
.env
.env.local
.env.production
node_modules/
.next/
*.pem
```

---

## 6. Pagamentos Internacionais e Brasil

### 6.1 Metodos de Pagamento por Regiao

| Regiao          | Metodos                                    |
|-----------------|--------------------------------------------|
| Internacional   | Cartao (Visa, Master, Amex), Apple Pay, Google Pay, Link |
| Brasil          | Cartao, PIX (instantaneo), Boleto bancario |

### 6.2 Multi-moeda

- Seletor de moeda no header (BRL, USD, CAD, EUR)
- Precos definidos manualmente por moeda no catalogo (para evitar flutuacao)
- Stripe recebe o preco na moeda selecionada
- Conta Stripe deve estar configurada para aceitar multiplas moedas

### 6.3 Stripe Brasil

- Para aceitar PIX e boleto, e necessario:
  - Conta Stripe registrada no Brasil (CNPJ ou CPF de MEI)
  - Ou usar Stripe Connect com conta brasileira
  - Ativar metodos de pagamento no dashboard do Stripe

---

## 7. Design e UX

### 7.1 Identidade Visual

- **Fundo**: escuro/preto (#000000 ou #0a0a0a) - valoriza as pecas de vidro
- **Texto**: branco/off-white (#ffffff, #e5e5e5)
- **Acentos**: minimalista, deixar as pecas serem o destaque
- **Tipografia**: sans-serif limpa (Inter, Geist, ou similar)
- **Espacamento**: generoso, galeria-like

### 7.2 Responsividade

- Mobile-first approach
- Grid adaptativo (1 → 2 → 3 → 4 colunas)
- Galeria com swipe no mobile
- Carrinho como bottom sheet no mobile

### 7.3 Hover Effect nos Produtos

```css
.product-card {
  position: relative;
  overflow: hidden;
}

.product-card .image-primary,
.product-card .image-secondary {
  transition: opacity 0.4s ease;
}

.product-card .image-secondary {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.product-card:hover .image-primary {
  opacity: 0;
}

.product-card:hover .image-secondary {
  opacity: 1;
}
```

---

## 8. SEO e Performance

- **SSG** (Static Site Generation) para todas as paginas de produto
- **Image optimization** via next/image (WebP, lazy loading, srcset)
- **Meta tags** Open Graph e Twitter Cards para compartilhamento
- **Structured data** (JSON-LD) com schema.org/Product
- **Sitemap** automatico via next-sitemap
- **Core Web Vitals**: LCP < 2.5s, CLS < 0.1

---

## 9. Fases de Implementacao

### Fase 1 - MVP (Prioridade)
1. Setup do projeto Next.js + Tailwind
2. Layout global (Header com logo + nav + currency selector, Footer)
3. Pagina inicial com Hero + Grid de produtos
4. Hover effect nos cards
5. Pagina de detalhe com galeria + info + accordion
6. Catalogo de produtos em JSON
7. Carrinho (state com Zustand ou Context API)
8. Integracao Stripe Checkout
9. Pagina de sucesso pos-pagamento
10. Deploy na Vercel

### Fase 2 - Seguranca e Compliance
1. Webhook do Stripe para confirmacao
2. Headers de seguranca
3. Rate limiting
4. Politica de privacidade (LGPD/GDPR)
5. Banner de cookies
6. .env e segredos configurados corretamente

### Fase 3 - Polimento
1. Animacoes e transicoes (Framer Motion)
2. Pagina About
3. SEO (meta tags, sitemap, structured data)
4. Analytics (Plausible ou similar)
5. Email de confirmacao pos-compra
6. Suporte a PIX e boleto (Stripe Brasil)

---

## 10. Dependencias Principais

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "stripe": "^17.x",
    "@stripe/stripe-js": "^5.x",
    "zustand": "^5.x"
  },
  "devDependencies": {
    "tailwindcss": "^4.x",
    "typescript": "^5.x",
    "@types/react": "^19.x",
    "@types/node": "^22.x"
  }
}
```

---

## 11. Checklist de Seguranca Pre-Deploy

- [ ] Chaves do Stripe em variaveis de ambiente (nunca no codigo)
- [ ] .env.local no .gitignore
- [ ] HTTPS ativo (Vercel automatico)
- [ ] Webhook com verificacao de assinatura
- [ ] Headers de seguranca configurados
- [ ] Rate limiting na API de checkout
- [ ] CSP configurado
- [ ] Input validation em todas as API routes
- [ ] Nenhum dado sensivel no client-side
- [ ] Politica de privacidade publicada
- [ ] CORS restrito ao dominio proprio
- [ ] Dependencias auditadas (npm audit)
