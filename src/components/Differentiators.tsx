import { Gauge, ShieldCheck, Sparkles, KeyRound, type LucideIcon } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { DIFFERENTIATORS } from "../lib/data";

const ICONS: Record<string, LucideIcon> = {
  gauge: Gauge,
  shield: ShieldCheck,
  sparkles: Sparkles,
  key: KeyRound,
};

export function Differentiators() {
  return (
    <section className="bg-forest-950 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow>Por que código próprio</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Não é só um site. É um ativo que você controla.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-dim">
            React + Vite + Tailwind, sem WordPress e sem construtores visuais. O que isso muda na
            prática:
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = ICONS[d.icon] ?? Sparkles;
            return (
              <Reveal key={d.title} delay={i * 0.07}>
                <div className="flex h-full gap-5 rounded-3xl border border-ink/10 bg-forest-900 p-7 transition-colors duration-300 hover:border-copper-500/40">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-copper-500/12 text-copper-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl text-ink">{d.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-dim">{d.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
