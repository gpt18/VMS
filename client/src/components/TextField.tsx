import { ComponentProps } from 'react'

type TextFieldProps = {
    label?: string,
    type?: string,
    description?: string,
    error?: string,
} & ComponentProps<"input">

export function TextField ({ ...props }: TextFieldProps) {
    return (
        <input {...props} className="block w-full appearance-none rounded-md border-0 ring-1 ring-gray-950/10 bg-white px-3 py-2 text-sm text-zinc-950 shadow outline-none placeholder:text-zinc-500 focus:ring-blue-500" />
    );
}