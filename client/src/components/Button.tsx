import { VariantProps, cva } from "class-variance-authority";
import { Children, ComponentProps, ElementType, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
        default: ["bg-secondary", "hover:bg-secondary-hover"],
        ghost: ["hover:bg-gray-100"],
        dark: ["bg-secondary-dark", "hover:bg-secondary-dark-hover", "text-secondary"],
        text: ["text-primary", "hover:bg-primary-hover"],
        contained: ["bg-primary text-white shadow", "hover:bg-primary-dark-hover hover:shadow-md"],
        outlined: ["text-primary border border-primary", "hover:bg-primary-hover hover:border-primary-dark-hover"],
        gray: ["bg-gray-300 hover:bg-gray-400 text-gray-800"],
        chip: ["text-primary font-bold bg-primary-hover text-sm", "hover:bg-primary hover:text-primary-hover"],
    },
    size: {
      default: ["rounded", "py-2 px-4"],
      icon: ["rounded-full", "w-10", "h-10", "flex", "item-center", "justify-center", "p-2.5"],
      small: ["rounded", "py-2 px-3", "text-sm"],
      large: ["rounded", "py-2 px-3", "text-lg"],
      ["small-chip"]: ["rounded-2xl", "py-2 px-4", "text-sm"]
      
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button"> & {
  startIcon?: ReactNode,
  endIcon?: ReactNode
}

export function Button({ children, variant, size, className, startIcon, endIcon, ...props } : ButtonProps) {
  return <button {...props} className={twMerge(buttonStyles({ variant, size }), `${(startIcon || endIcon) && "flex justify-center items-center gap-2"}` ,className)} >
    {startIcon} {children} {endIcon}
  </button>;
}
