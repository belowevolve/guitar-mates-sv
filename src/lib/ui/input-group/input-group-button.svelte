<script lang="ts" module>
	import type { VariantProps } from '$lib/ui';

	import { cva } from '$lib/ui';

	const inputGroupButtonVariants = cva({
		base: 'flex items-center gap-2 text-sm shadow-none',
		defaultVariants: {
			size: 'xs'
		},
		variants: {
			size: {
				'icon-sm': 'size-8 p-0 has-[>svg]:p-0',
				'icon-xs': 'size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0',
				sm: 'h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5',
				xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*='size-'])]:size-3.5"
			}
		}
	});

	export type InputGroupButtonSize = VariantProps<typeof inputGroupButtonVariants>['size'];
</script>

<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Button } from '$lib/ui/button';

	let {
		children,
		class: className,
		ref = $bindable(null),
		size = 'xs',
		type = 'button',
		variant = 'ghost',
		...restProps
	}: {
		size?: InputGroupButtonSize;
	} & Omit<ComponentProps<typeof Button>, 'href' | 'size'> = $props();
</script>

<Button
	class={inputGroupButtonVariants({ className, size })}
	data-size={size}
	{type}
	{variant}
	bind:ref
	{...restProps}
>
	{@render children?.()}
</Button>
