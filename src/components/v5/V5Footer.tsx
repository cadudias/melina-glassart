import Link from "next/link";

export default function V5Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-10 text-center">
      <p className="text-[10px] tracking-[0.25em] uppercase text-white/35 mb-4">
        Melina Glass Art
      </p>
      <Link
        href="/"
        className="text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
      >
        Outras versões do site
      </Link>
    </footer>
  );
}
