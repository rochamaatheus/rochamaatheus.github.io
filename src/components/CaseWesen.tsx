import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { ButtonLink } from "./Button";
import { GemMark } from "./GemMark";
import { WESEN } from "../lib/data";

export function CaseWesen() {
  return (
    <section id="case" className="bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow tone="dark">Case em destaque</Eyebrow>
        </Reveal>

        {/* Cabeçalho do case */}
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-serif text-5xl text-forest-900 sm:text-6xl">{WESEN.client}</h2>
              <p className="mt-2 text-lg text-forest-800/70">{WESEN.tagline}</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-forest-900/15 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-forest-800">
              <GemMark className="h-3.5 w-auto" />
              {WESEN.segment}
            </span>
          </div>
        </Reveal>

        {/* Desafio + Solução */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-forest-900/10 bg-cream-50 p-7">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-copper-600">
                O desafio
              </h3>
              <p className="mt-4 leading-relaxed text-forest-800">{WESEN.challenge}</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-forest-900/10 bg-forest-900 p-7">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-copper-400">
                A solução
              </h3>
              <p className="mt-4 leading-relaxed text-ink-dim">{WESEN.solution}</p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {WESEN.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-copper-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Tabela de diagnóstico — antes → depois (peça-assinatura) */}
        <Reveal delay={0.05}>
          <div className="mt-8 overflow-hidden rounded-3xl border border-forest-900/10 bg-cream-50">
            <div className="grid grid-cols-[1fr] gap-px bg-forest-900/10 sm:grid-cols-[0.8fr_1fr_1fr]">
              {/* Cabeçalho (escondido no mobile, vira cards) */}
              <div className="hidden bg-forest-900 px-6 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim sm:block">
                Critério
              </div>
              <div className="hidden bg-forest-900 px-6 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim sm:block">
                Antes
              </div>
              <div className="hidden bg-forest-900 px-6 py-4 font-mono text-xs uppercase tracking-[0.15em] text-copper-400 sm:block">
                Com o projeto
              </div>

              {WESEN.beforeAfter.map((row) => (
                <div key={row.area} className="contents">
                  <div className="bg-cream-100 px-6 pt-5 pb-1 font-semibold text-forest-900 sm:py-5 sm:pb-5">
                    {row.area}
                  </div>
                  <div className="flex items-center gap-2 bg-cream-50 px-6 pb-1 pt-1 text-sm text-forest-800/70 sm:py-5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-forest-800/40 sm:hidden">
                      antes:
                    </span>
                    {row.before}
                  </div>
                  <div className="flex items-center gap-2 bg-cream-50 px-6 pb-5 pt-1 text-sm font-medium text-forest-900 sm:py-5">
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-copper-500 sm:block" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-copper-600 sm:hidden">
                      depois:
                    </span>
                    {row.after}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {WESEN.liveUrl && (
          <Reveal delay={0.05}>
            <div className="mt-8">
              <ButtonLink
                href={WESEN.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="cream"
              >
                Ver o site no ar
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ButtonLink>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
