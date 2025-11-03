import { defineConfig } from 'cva';
import { twMerge } from 'tailwind-merge';
export type { VariantProps } from 'cva';

export const { cva, cx: cn } = defineConfig({
	hooks: { onComplete: twMerge }
});

export type WithElementRef<T, U extends HTMLElement = HTMLElement> = { ref?: null | U } & T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
