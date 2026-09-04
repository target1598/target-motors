import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        default: "bg-brand text-accent-foreground hover:bg-brand-dark",
        inverse: "bg-paper text-ink hover:opacity-90",
        outline: "border border-border bg-transparent text-fg hover:bg-fg/5",
        ghost: "text-fg hover:bg-fg/5",
        paper: "border border-rule bg-paper text-ink hover:bg-mist",
        chrome: "border border-chrome-fg/25 bg-transparent text-chrome-fg hover:bg-chrome-fg/10",
        whatsapp: "bg-whatsapp text-accent-foreground hover:opacity-90",
      },
      size: {
        default: "h-11",
        sm: "h-10 min-h-10 px-4 text-sm",
        lg: "h-12 min-h-12 px-6",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";
