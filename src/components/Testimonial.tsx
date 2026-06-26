import { Reveal } from "./Reveal";
import { GemMark } from "./GemMark";
import { TESTIMONIAL } from "../lib/data";

export function Testimonial() {
  return (
    <section className="bg-forest-900 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <GemMark className="mx-auto h-9 w-auto" />
        </Reveal>
        <Reveal delay={0.05}>
          <blockquote
            className={`mt-8 font-serif text-3xl leading-[1.35] sm:text-4xl sm:leading-[1.4] ${
              TESTIMONIAL.isPlaceholder ? "text-ink-dim italic" : "text-ink"
            }`}
          >
            “{TESTIMONIAL.quote}”
          </blockquote>
        </Reveal>
        <Reveal delay={0.1}>
          <figcaption className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-copper-400">
            {TESTIMONIAL.author} · <span className="text-ink-dim">{TESTIMONIAL.role}</span>
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
