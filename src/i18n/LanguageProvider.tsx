"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  dictionary,
  LOCALES,
  type Locale,
} from "@/i18n/dictionary";

type LanguageContextValue = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  /** Dictionary subtree for the active language. */
  t: (typeof dictionary)[Locale];
};

const STORAGE_KEY = "melina-glassart-lang";

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value !== null && (LOCALES as string[]).includes(value);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always render the default locale on the server / first client paint to
  // avoid hydration mismatches; the stored preference is applied after mount.
  const [lang, setLangState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLocale(saved)) {
        setLangState(saved);
      }
    } catch {
      // localStorage unavailable — keep the default locale.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const setLang = useCallback((next: Locale) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore persistence failures (private mode, etc.).
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: dictionary[lang] }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return context;
}
