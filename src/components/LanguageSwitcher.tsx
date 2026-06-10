"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import { LOCALES, LOCALE_LABELS } from "@/i18n/dictionary";

type Variant = "light" | "dark" | "vitrail";

const styles: Record<
  Variant,
  { active: string; inactive: string; divider: string }
> = {
  dark: {
    active: "text-[#d4af37]",
    inactive: "text-stone-500 hover:text-stone-300",
    divider: "text-stone-700",
  },
  vitrail: {
    active: "text-amber-900",
    inactive: "text-stone-500 hover:text-stone-800",
    divider: "text-stone-400",
  },
  light: {
    active: "text-foreground",
    inactive: "text-muted hover:text-foreground",
    divider: "text-border",
  },
};

export default function LanguageSwitcher({
  variant = "light",
}: {
  variant?: Variant;
}) {
  const { lang, setLang, t } = useI18n();
  const s = styles[variant];

  return (
    <div
      className="flex items-center gap-1.5 text-[11px] tracking-[0.15em] uppercase select-none"
      role="group"
      aria-label={t.nav.language}
    >
      {LOCALES.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1.5">
          {index > 0 && (
            <span className={s.divider} aria-hidden="true">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(locale)}
            aria-pressed={lang === locale}
            className={`transition-colors duration-300 ${
              lang === locale ? s.active : s.inactive
            }`}
          >
            {LOCALE_LABELS[locale]}
          </button>
        </span>
      ))}
    </div>
  );
}
