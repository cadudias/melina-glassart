import Link from "next/link";

type FooterProps = {
  variant?: "light" | "dark" | "vitrail";
};

export default function Footer({ variant = "light" }: FooterProps) {
  const isDark = variant === "dark";
  const isVitrail = variant === "vitrail";

  return (
    <footer
      className={
        isDark
          ? "border-t border-white/10 mt-auto bg-[#0c0d10] text-[#ece8e1]"
          : isVitrail
            ? "mt-auto border-t-2 border-stone-800/12 bg-gradient-to-b from-amber-50/60 via-white to-lime-50/40 text-stone-800"
            : "border-t border-border/50 mt-auto"
      }
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10">
          {/* Brand */}
          <div>
            <p
              className={
                isDark
                  ? "text-sm tracking-[0.2em] uppercase font-light mb-4 text-[#f5f2ec]"
                  : isVitrail
                    ? "text-sm tracking-[0.2em] uppercase font-light mb-4 text-stone-900"
                    : "text-sm tracking-[0.2em] uppercase font-light mb-4"
              }
            >
              Melina Glass Art
            </p>
            <p
              className={
                isDark
                  ? "text-sm text-[#8a8580] leading-relaxed max-w-[40ch]"
                  : isVitrail
                    ? "text-sm text-stone-600 leading-relaxed max-w-[40ch]"
                    : "text-sm text-muted leading-relaxed max-w-[40ch]"
              }
            >
              Handcrafted stained glass art. Each piece is unique, made with
              traditional techniques and contemporary vision.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              className={
                isDark
                  ? "text-xs tracking-[0.2em] uppercase text-[#8a8580] mb-4"
                  : isVitrail
                    ? "text-xs tracking-[0.2em] uppercase text-teal-900/70 mb-4"
                    : "text-xs tracking-[0.2em] uppercase text-muted mb-4"
              }
            >
              Navigate
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Works", href: "/v1" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isDark
                      ? "text-sm text-[#8a8580] hover:text-[#d4af37] transition-colors duration-300 w-fit"
                      : isVitrail
                        ? "text-sm text-stone-600 hover:text-amber-900 transition-colors duration-300 w-fit"
                        : "text-sm text-muted hover:text-foreground transition-colors duration-300 w-fit"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p
              className={
                isDark
                  ? "text-xs tracking-[0.2em] uppercase text-[#8a8580] mb-4"
                  : isVitrail
                    ? "text-xs tracking-[0.2em] uppercase text-teal-900/70 mb-4"
                    : "text-xs tracking-[0.2em] uppercase text-muted mb-4"
              }
            >
              Legal
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
                { label: "Shipping Info", href: "/shipping" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    isDark
                      ? "text-sm text-[#8a8580] hover:text-[#d4af37] transition-colors duration-300 w-fit"
                      : isVitrail
                        ? "text-sm text-stone-600 hover:text-amber-900 transition-colors duration-300 w-fit"
                        : "text-sm text-muted hover:text-foreground transition-colors duration-300 w-fit"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={
            isDark
              ? "mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
              : isVitrail
                ? "mt-12 pt-8 border-t border-stone-800/15 flex flex-col sm:flex-row items-center justify-between gap-4"
                : "mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4"
          }
        >
          <p
            className={
              isDark
                ? "text-xs text-[#8a8580]"
                : isVitrail
                  ? "text-xs text-stone-600"
                  : "text-xs text-muted"
            }
          >
            &copy; {new Date().getFullYear()} Melina Glass Art. All rights
            reserved.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={
              isDark
                ? "text-xs tracking-[0.15em] uppercase text-[#8a8580] hover:text-[#d4af37] transition-colors duration-300"
                : isVitrail
                  ? "text-xs tracking-[0.15em] uppercase text-stone-600 hover:text-teal-800 transition-colors duration-300"
                  : "text-xs tracking-[0.15em] uppercase text-muted hover:text-accent transition-colors duration-300"
            }
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
