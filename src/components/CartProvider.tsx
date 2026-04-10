"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Image from "next/image";

type CartItem = {
  slug: string;
  title: string;
  price: number;
  currency: "USD" | "BRL";
  image: string;
  quantity: number;
};

type AddToCartInput = Omit<CartItem, "quantity"> & { quantity?: number };

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: AddToCartInput) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
};

const STORAGE_KEY = "melina-glassart-cart";

const CartContext = createContext<CartContextValue | null>(null);

function formatPrice(cents: number, currency: "USD" | "BRL"): string {
  const locale = currency === "BRL" ? "pt-BR" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(cents / 100);
}

function CartDrawer({
  items,
  isOpen,
  totalPrice,
  isCheckingOut,
  closeCart,
  removeFromCart,
  updateQuantity,
  checkout,
}: {
  items: CartItem[];
  isOpen: boolean;
  totalPrice: number;
  isCheckingOut: boolean;
  closeCart: () => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  checkout: () => Promise<void>;
}) {
  const hasItems = items.length > 0;
  const currency = items[0]?.currency ?? "BRL";

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-black/25 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      <aside
        className={`fixed top-0 right-0 z-[80] h-full w-full max-w-[480px] bg-background text-foreground border-l border-border/70 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-border/70">
            <h2 className="text-3xl font-light tracking-tight">
              Carrinho{" "}
              <span className="text-base text-muted">
                ({items.length} {items.length === 1 ? "item" : "itens"})
              </span>
            </h2>
            <button
              onClick={closeCart}
              className="text-muted hover:text-foreground text-3xl leading-none"
              aria-label="Fechar carrinho"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            {!hasItems && (
              <p className="text-muted">Seu carrinho está vazio.</p>
            )}

            {items.map((item) => (
              <div
                key={item.slug}
                className="grid grid-cols-[88px_1fr_auto] gap-3 pb-5 mb-5 border-b border-border/70"
              >
                <div className="relative h-[88px] w-[88px] bg-surface border border-border/60">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-xl leading-tight mb-1.5">{item.title}</p>
                  <p className="text-lg mb-3">{formatPrice(item.price, item.currency)}</p>
                  <div className="inline-flex items-center border border-border">
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      className="w-9 h-9 text-lg hover:bg-surface-hover"
                      aria-label="Diminuir quantidade"
                    >
                      −
                    </button>
                    <span className="w-9 text-center text-base">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="w-9 h-9 text-lg hover:bg-surface-hover"
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.slug)}
                    className="text-muted hover:text-foreground text-sm"
                    aria-label="Remover item"
                  >
                    Remover
                  </button>
                  <p className="text-2xl leading-none">
                    {formatPrice(item.price * item.quantity, item.currency)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-6 py-5 border-t border-border/70 space-y-4">
            <div className="flex items-end justify-between gap-4">
              <p className="text-2xl md:text-3xl leading-none font-light">Total estimado</p>
              <p className="text-3xl md:text-4xl leading-none font-light whitespace-nowrap">
                {formatPrice(totalPrice, currency)}
              </p>
            </div>

            <p className="text-muted text-sm">
              Impostos e frete são calculados no checkout.
            </p>

            <button
              onClick={checkout}
              disabled={!hasItems || isCheckingOut}
              className="w-full py-3.5 bg-accent text-white text-xl font-medium hover:bg-accent-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? "Redirecionando..." : "Finalizar compra"}
            </button>
            <button className="w-full py-3.5 border border-accent text-accent text-xl hover:bg-surface-hover transition-colors">
              Ver carrinho
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved) as CartItem[]);
      }
    } catch {
      setItems([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totalItems,
      totalPrice,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addToCart: (input) => {
        setItems((current) => {
          const found = current.find((item) => item.slug === input.slug);
          const qty = input.quantity ?? 1;
          if (found) {
            return current.map((item) =>
              item.slug === input.slug
                ? { ...item, quantity: item.quantity + qty }
                : item,
            );
          }
          return [...current, { ...input, quantity: qty }];
        });
        setIsOpen(true);
      },
      removeFromCart: (slug) => {
        setItems((current) => current.filter((item) => item.slug !== slug));
      },
      updateQuantity: (slug, quantity) => {
        if (quantity <= 0) {
          setItems((current) => current.filter((item) => item.slug !== slug));
          return;
        }
        setItems((current) =>
          current.map((item) => (item.slug === slug ? { ...item, quantity } : item)),
        );
      },
    }),
    [items, totalItems, totalPrice, isOpen],
  );

  const handleCheckout = async () => {
    if (items.length === 0 || isCheckingOut) return;

    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            slug: item.slug,
            quantity: item.quantity,
          })),
        }),
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Erro ao iniciar checkout.");
      }

      window.location.href = data.url;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao iniciar checkout.";
      window.alert(message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer
        items={items}
        isOpen={isOpen}
        totalPrice={totalPrice}
        isCheckingOut={isCheckingOut}
        closeCart={value.closeCart}
        removeFromCart={value.removeFromCart}
        updateQuantity={value.updateQuantity}
        checkout={handleCheckout}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
