import { cn } from "../lib/utils";

/** A gema da marca — elemento-assinatura recorrente. */
export function GemMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      className={cn("text-copper-500", className)}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M11 21 L24 8 L37 21" />
        <path d="M11 21 H37" />
        <path d="M11 21 L24 48 L37 21" />
        <path d="M24 8 V21" />
      </g>
      <g stroke="currentColor" strokeWidth="1" opacity="0.5">
        <path d="M17.5 21 L24 48 M30.5 21 L24 48" />
      </g>
    </svg>
  );
}
