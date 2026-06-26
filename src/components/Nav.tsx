import { useEffect, useState } from "react";
import { GemMark } from "./GemMark";
import { ButtonLink } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { CONTACT, waLink } from "../lib/data";
import { cn } from "../lib/utils";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#case", label: "Case" },
  { href: "#processo", label: "Processo" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink/10 bg-forest-900/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#topo" className="flex items-center gap-2.5" aria-label="Início — Matheus Rocha">
          <GemMark className="h-7 w-auto" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg text-ink">Matheus Rocha</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">
              {CONTACT.role}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-dim transition-colors hover:text-copper-300"
            >
              {l.label}
            </a>
          ))}
        </div>

        <ButtonLink
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
          className="hidden sm:inline-flex"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </ButtonLink>
      </nav>
    </header>
  );
}
