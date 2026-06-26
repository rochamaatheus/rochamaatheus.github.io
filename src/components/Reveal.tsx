import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}

/** Revela o conteúdo com fade + leve subida ao entrar na viewport. Respeita prefers-reduced-motion. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface EyebrowProps {
  children: ReactNode;
  /** Tom do texto conforme o fundo da seção. */
  tone?: "light" | "dark";
  className?: string;
}

/** Rótulo técnico em mono — o contraponto "código" da serifa editorial. */
export function Eyebrow({ children, tone = "light", className = "" }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] ${
        tone === "light" ? "text-copper-400" : "text-copper-600"
      } ${className}`}
    >
      <span aria-hidden className="h-px w-6 bg-current opacity-60" />
      {children}
    </span>
  );
}
