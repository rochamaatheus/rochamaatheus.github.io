import { Clock } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { PROCESS } from "../lib/data";

export function Process() {
  return (
    <section id="processo" className="bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow tone="dark">Como funciona</Eyebrow>
          <h2 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-forest-900 sm:text-5xl">
            Um processo claro, do briefing à entrega.
          </h2>
        </Reveal>

        <ol className="mt-14 space-y-px overflow-hidden rounded-3xl border border-forest-900/10">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.05}>
              <li className="group flex flex-col gap-2 bg-cream-50 px-6 py-7 transition-colors duration-300 hover:bg-cream-200/50 sm:flex-row sm:items-baseline sm:gap-8 sm:px-8">
                <span className="font-mono text-sm text-copper-500">{p.step}</span>
                <div className="sm:flex-1">
                  <h3 className="font-serif text-2xl text-forest-900">{p.title}</h3>
                  <p className="mt-1.5 max-w-2xl leading-relaxed text-forest-800/75">{p.desc}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.05}>
          <p className="mt-7 inline-flex items-center gap-2.5 font-mono text-sm text-forest-800/70">
            <Clock className="h-4 w-4 text-copper-500" />
            Prazo estimado: 10 a 14 dias úteis após os materiais e a aprovação do design.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
