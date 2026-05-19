import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const ctaVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary brand gradient – main CTA (Book Now)
        primary:
          "bg-gradient-brand text-white shadow-glow hover:scale-[1.02] active:scale-[0.99]",
        // Solid deep teal – secondary high-emphasis
        solid:
          "bg-tertiary text-tertiary-foreground hover:opacity-95",
        // Outline / ghost on light backgrounds
        outline:
          "border border-border text-foreground hover:border-tertiary hover:text-tertiary bg-card/40 backdrop-blur-sm",
        // Subtle pill (e.g., header phone)
        subtle:
          "text-tertiary hover:bg-mist",
        // Translucent for use on dark hero / image backgrounds
        glass:
          "bg-white/10 backdrop-blur border border-white/25 text-white hover:bg-white/15",
      },
      size: {
        sm: "h-9 px-4 text-xs sm:text-sm gap-1.5 [&_svg]:size-3.5",
        md: "h-11 px-5 text-sm gap-2 [&_svg]:size-4",
        lg: "h-12 sm:h-[3.25rem] px-5 sm:px-6 text-sm sm:text-base gap-2 [&_svg]:size-4 sm:[&_svg]:size-5",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      block: false,
    },
  }
);

export type CTAVariantProps = VariantProps<typeof ctaVariants>;

type DivProps = React.HTMLAttributes<HTMLElement>;

export interface CTAButtonProps extends DivProps, CTAVariantProps {
  asChild?: boolean;
}

/**
 * CTAButton renders a styled wrapper. Pass an `<a>`, `<Link>`, or `<button>` as the only child
 * with `asChild` to attach the styles, or use the `ctaVariants()` className helper directly
 * on any element for full type-safety with TanStack Router links.
 */
export const CTAButton = React.forwardRef<HTMLElement, CTAButtonProps>(
  ({ asChild = true, className, variant, size, block, children, ...props }, ref) => {
    const cls = cn(ctaVariants({ variant, size, block }), className);
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        ...props,
        ref,
        className: cn(cls, child.props.className),
      } as Record<string, unknown>);
    }
    return (
      <span ref={ref as React.Ref<HTMLSpanElement>} className={cls} {...props}>
        {children}
      </span>
    );
  }
);
CTAButton.displayName = "CTAButton";

/** Convenience className helper – preferred for TanStack <Link to=...> usage. */
export const ctaClass = (
  props?: CTAVariantProps & { className?: string }
) => {
  const { className, ...variants } = props ?? {};
  return cn(ctaVariants(variants), className);
};
