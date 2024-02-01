import { VariantProps, cva } from 'class-variance-authority';
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge';

const inputStyles = cva(['transition-colors', 'w-full', 'appearance-none', 'outline-none'], {
    variants: {
        sizes: {
            small: ['text-xs', 'p-2', 'rounded-md'],
            basic: ['text-sm', 'p-2.5', 'rounded-lg'],
            large: ['text-md', 'p-4', 'rounded-lg'],
        },
        state: {
            normal: ['bg-gray-50', 'border','focus:bg-white', 'border-gray-300', 'text-gray-900', 'focus:ring-blue-500', 'focus:border-blue-500', 'block', 'shadow'],
            focus: ['focus:border', 'focus:ring-blue-500', 'focus:border-blue-500'],
            disabled: ['bg-gray-200', 'text-gray-400', 'cursor-not-allowed'],
        },

    },
    defaultVariants: {
        sizes: 'basic',
        state: 'normal',
    }
})


type InputProps = VariantProps<typeof inputStyles> & ComponentProps<"input">

export function TextField({ sizes, state, className, ...props }: InputProps) {
    return (
        <input {...props} className={twMerge(inputStyles({ sizes, state }), className)} />
    );
}

