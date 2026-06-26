import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { GemMark } from "./GemMark";
import { ButtonLink } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { CONTACT, waLink } from "../lib/data";
import { cn } from "../lib/utils";

const LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#case", label: "Case" },
  { href: "#processo", label: "Processo" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          className="hidden md:inline-flex"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </ButtonLink>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-ink-dim transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-400 md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-1 border-t border-ink/10 bg-forest-900/95 px-5 py-5 backdrop-blur-md md:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-ink-dim transition-colors hover:text-copper-300"
              >
                {l.label}
              </a>
            ))}

            <div className="mt-3">
              <ButtonLink
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                className="w-full justify-center"
                onClick={() => setOpen(false)}
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
