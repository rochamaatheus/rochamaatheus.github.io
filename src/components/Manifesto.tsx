import { Reveal, Eyebrow } from "./Reveal";

export function Manifesto() {
  return (
    <section className="bg-cream-100 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <Eyebrow tone="dark">O que eu faço</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-8 font-serif text-3xl leading-[1.25] text-forest-900 sm:text-4xl sm:leading-[1.3]">
            A maioria dos negócios bons trava no mesmo ponto: uma identidade forte, presa a um{" "}
            <span className="text-copper-600">Linktree genérico</span>. Eu construo o destino que
            faltava — uma página própria que apresenta, convence e{" "}
            <em className="text-copper-600">converte em contato</em>.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-forest-800/80">
            Trabalho sozinho e cuido de cada projeto do briefing ao deploy. Isso mantém o preço justo
            e a qualidade no detalhe — sem time intermediário, sem template de prateleira.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
