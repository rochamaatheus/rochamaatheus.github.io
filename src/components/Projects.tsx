import { PROJECTS, waLink } from "../lib/data";
import { Reveal, Eyebrow } from "./Reveal";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";

const TYPE_LABELS: Record<string, string> = {
  site: "Site Completo",
  lp: "Página de Vendas",
  "bio-link": "Link da Bio",
};

export function Projects() {
  return (
    <section id="projetos" className="bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow tone="dark">Projetos</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-forest-900 sm:text-5xl">
            Trabalhos entregues.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-forest-800/70">
            Cada projeto começa do zero. Sem template genérico — só o que faz sentido para o seu
            negócio.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.client} delay={0.1 + i * 0.08}>
              <article
                className={cn(
                  "flex flex-col gap-4 rounded-3xl border border-forest-900/10 bg-cream-50 p-7",
                  "transition-colors duration-300 hover:border-copper-500/30",
                )}
              >
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-copper-500/10 px-3 py-1 text-xs font-medium text-copper-700">
                    {TYPE_LABELS[project.type] ?? project.type}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-forest-800/50">
                    {project.segment}
                  </span>
                </div>

                {/* Client name */}
                <h3 className="font-serif text-2xl leading-snug text-forest-900">
                  {project.client}
                </h3>

                {/* Description */}
                <p className="grow text-[15px] leading-relaxed text-forest-800/80">{project.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-forest-900/[0.08] px-2.5 py-1 text-xs text-forest-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live URL button */}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-copper-600 transition-colors hover:text-copper-500"
                    aria-label={`Ver projeto ${project.client} ao vivo`}
                  >
                    Ver projeto ao vivo
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* Footer CTA */}
        <Reveal delay={0.2}>
          <p className="mt-14 text-center text-[15px] text-forest-800/70">
            Quer ver como ficou na prática?{" "}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-copper-600 underline underline-offset-4 transition-colors hover:text-copper-500"
            >
              Me chama no WhatsApp que te mostro o projeto ao vivo.
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
