import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'secondary' | 'dark' | 'ghost'
const base =
  'inline-flex items-center justify-center gap-2 rounded-[2px] font-semibold transition-[box-shadow,background-color,color,border-color] duration-200 disabled:cursor-not-allowed disabled:opacity-45 whitespace-nowrap'
const variants: Record<Variant, string> = {
  primary: 'bg-ember text-cream hover:shadow-[0_0_0_4px_rgb(240_138_60_/_.22),0_6px_24px_-6px_rgb(240_138_60_/_.7)] hover:bg-[#b0231a]',
  secondary: 'border border-oxblood/70 text-oxblood hover:border-oxblood hover:bg-oxblood/[.06]',
  dark: 'border border-molten text-molten hover:bg-molten/10 hover:shadow-[0_0_24px_-6px_rgb(240_138_60_/_.6)]',
  ghost: 'text-ember underline-offset-4 hover:underline',
}
const sizes = { md: 'h-11 px-5 text-[15px]', lg: 'h-14 px-7 text-[17px]', sm: 'h-9 px-3.5 text-[14px]' }

type Common = { variant?: Variant; size?: keyof typeof sizes; className?: string; children: ReactNode }

export function Button({ variant = 'primary', size = 'md', className = '', ...p }: Common & ComponentProps<'button'>) {
  return <button type="button" className={`${base} ${variants[variant]} ${variant !== 'ghost' ? sizes[size] : ''} ${className}`} {...p} />
}

export function ButtonLink({ variant = 'primary', size = 'md', className = '', ...p }: Common & ComponentProps<typeof Link>) {
  return <Link className={`${base} ${variants[variant]} ${variant !== 'ghost' ? sizes[size] : ''} ${className}`} {...p} />
}
