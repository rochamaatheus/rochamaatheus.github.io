import { Instagram, Mail, MapPin } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { ButtonLink } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { CONTACT, waLink } from "../lib/data";

export function Contact() {
  return (
    <section id="contato" className="bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <Eyebrow tone="dark" className="justify-center">
            Próximo passo
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto mt-7 max-w-2xl font-serif text-4xl leading-tight text-forest-900 sm:text-6xl sm:leading-[1.1]">
            Vamos construir a sua <em className="text-copper-600">presença digital</em>?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-forest-800/80">
            Me conta sobre o seu negócio pelo WhatsApp. Faço um diagnóstico rápido e gratuito da sua
            presença atual — sem compromisso.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex justify-center">
            <ButtonLink
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Chamar no WhatsApp — {CONTACT.phone}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-forest-800/75">
            <a
              href={`https://instagram.com/${CONTACT.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-copper-600"
            >
              <Instagram className="h-4 w-4" />@{CONTACT.instagram}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-copper-600"
            >
              <Mail className="h-4 w-4" />
              {CONTACT.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {CONTACT.city}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
