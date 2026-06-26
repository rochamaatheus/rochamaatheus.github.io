import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "./Button";
import { GemMark } from "./GemMark";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ArrowDown } from "lucide-react";
import { CONTACT, waLink } from "../lib/data";

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      id="topo"
      className="relative overflow-hidden bg-forest-900 pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* atmosfera: brilho de cobre + gema gigante ao fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-copper-600/10 blur-[120px]"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-10 hidden lg:block"
        animate={reduce ? undefined : { y: [0, -16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <GemMark className="h-[30rem] w-auto text-copper-500/10" />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl px-5 sm:px-8"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-copper-400">
            <GemMark className="h-4 w-auto" />
            {CONTACT.role} · {CONTACT.city}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 max-w-4xl font-serif text-[2.7rem] leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
        >
          Presença digital <em className="text-copper-400">à altura</em> de quem cuida de pessoas.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-lg leading-relaxed text-ink-dim"
        >
          Faço sites do zero para o seu negócio — sem template genérico, sem mensalidade de
          plataforma. Rápido no Google, com a cara da sua marca e{" "}
          <span className="text-ink">100% seu</span>.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={waLink()} target="_blank" rel="noopener noreferrer" size="lg">
            <WhatsAppIcon className="h-5 w-5" />
            Conversar no WhatsApp
          </ButtonLink>
          <ButtonLink href="#case" variant="outline" size="lg">
            Ver o case Wesen
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </ButtonLink>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-10 flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-ink-dim"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-copper-400 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-copper-400" />
          </span>
          Disponível para novos projetos · Joinville e região
        </motion.p>
      </motion.div>
    </section>
  );
}
