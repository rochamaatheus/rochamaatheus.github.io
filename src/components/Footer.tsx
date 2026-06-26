import { Instagram } from "lucide-react";
import { GemMark } from "./GemMark";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { CONTACT, waLink } from "../lib/data";

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

        <div className="flex items-center gap-5">
          <a
            href={`https://instagram.com/${CONTACT.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center gap-1.5 font-mono text-xs text-ink-dim transition-colors hover:text-copper-300"
          >
            <Instagram className="h-4 w-4" />
            @{CONTACT.instagram}
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex items-center gap-1.5 font-mono text-xs text-ink-dim transition-colors hover:text-copper-300"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
