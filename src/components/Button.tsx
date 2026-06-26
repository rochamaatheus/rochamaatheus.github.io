import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

const button = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        primary:
          "bg-copper-500 text-forest-950 shadow-lg shadow-copper-600/25 hover:-translate-y-0.5 hover:bg-copper-400 hover:shadow-xl hover:shadow-copper-500/30 motion-reduce:hover:translate-y-0",
        outline:
          "border border-ink/25 text-ink hover:-translate-y-0.5 hover:border-copper-400 hover:text-copper-300 motion-reduce:hover:translate-y-0",
        dark: "border border-forest-700 bg-forest-900 text-ink hover:-translate-y-0.5 hover:border-copper-500 motion-reduce:hover:translate-y-0",
        cream:
          "border border-forest-900/15 text-forest-900 hover:-translate-y-0.5 hover:border-copper-500 hover:text-copper-600 motion-reduce:hover:translate-y-0",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof button> {
  children: ReactNode;
}

export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <a className={cn(button({ variant, size }), className)} {...props}>
      {children}
    </a>
  );
}
