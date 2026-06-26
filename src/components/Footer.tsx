import { GemMark } from "./GemMark";
import { CONTACT } from "../lib/data";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-forest-950 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 sm:flex-row sm:px-8">
        <div className="flex items-center gap-3">
          <GemMark className="h-7 w-auto" />
          <div className="leading-tight">
            <p className="font-serif text-lg text-ink">{CONTACT.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              {CONTACT.role} · {CONTACT.city}
            </p>
          </div>
        </div>

        <p className="font-mono text-xs text-ink-dim">
          Feito em código próprio — React + Vite + Tailwind.
        </p>
      </div>
    </footer>
  );
}
