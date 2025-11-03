import { defineConfig } from 'cva';
import { twMerge } from 'tailwind-merge';
export type { VariantProps } from 'tailwind-variants';

export const { cva } = defineConfig({
	hooks: { onComplete: twMerge }
});
