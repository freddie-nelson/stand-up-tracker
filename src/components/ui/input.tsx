import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-md px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-input bg-transparent",
        "no-border": "bg-transparent border-0",
      },
      affects: {
        default: "h-9",
        lg: "h-11",
      },
    },
    defaultVariants: {
      variant: "default",
      affects: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, affects, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, affects, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
