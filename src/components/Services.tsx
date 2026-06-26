import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { GemMark } from "./GemMark";
import { SERVICES } from "../lib/data";

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="servicos" className="bg-forest-900 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Serviços</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Três formas de tirar o seu negócio do aluguel digital.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.08}>
              <motion.article
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex h-full flex-col rounded-3xl border border-ink/10 bg-forest-850 p-7 transition-colors duration-300 hover:border-copper-500/50"
              >
                <GemMark className="h-8 w-auto" />
                <h3 className="mt-5 font-serif text-2xl text-ink">{service.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-dim">{service.blurb}</p>
                <ul className="mt-6 space-y-2.5 border-t border-ink/10 pt-6">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-ink">
                      <Check className="h-4 w-4 shrink-0 text-copper-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
