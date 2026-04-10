import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/data/products";

type CheckoutSessionCreateParams = NonNullable<
  Parameters<InstanceType<typeof Stripe>["checkout"]["sessions"]["create"]>[0]
>;

type CheckoutItemInput = {
  slug: string;
  quantity: number;
};

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

function getBaseUrl(request: Request): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl) return appUrl;
  return new URL(request.url).origin;
}

export async function POST(request: Request) {
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY não configurada." },
      { status: 500 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const items = (payload as { items?: CheckoutItemInput[] })?.items;
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Carrinho vazio ou inválido." },
      { status: 400 },
    );
  }

  const lineItems: NonNullable<CheckoutSessionCreateParams["line_items"]> = [];

  for (const item of items) {
    if (!item?.slug || !Number.isInteger(item.quantity) || item.quantity <= 0) {
      return NextResponse.json(
        { error: "Item de checkout inválido." },
        { status: 400 },
      );
    }

    const product = products.find((entry) => entry.slug === item.slug);
    if (!product) {
      return NextResponse.json(
        { error: `Produto não encontrado: ${item.slug}` },
        { status: 400 },
      );
    }

    if (!product.available) {
      return NextResponse.json(
        { error: `Produto indisponível: ${product.title}` },
        { status: 400 },
      );
    }

    lineItems.push({
      quantity: item.quantity,
      price_data: {
        currency: product.currency.toLowerCase(),
        unit_amount: product.price,
        product_data: {
          name: product.title,
          description: product.description,
          images: product.images.slice(0, 1),
          metadata: { slug: product.slug },
        },
      },
    });
  }

  const stripe = new Stripe(stripeSecretKey);
  const baseUrl = getBaseUrl(request);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${baseUrl}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancelado`,
      billing_address_collection: "required",
      allow_promotion_codes: true,
      locale: "pt-BR",
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Não foi possível iniciar o checkout." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Falha ao criar sessão de checkout." },
      { status: 500 },
    );
  }
}
