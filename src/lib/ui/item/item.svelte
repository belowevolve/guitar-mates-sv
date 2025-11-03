<script lang="ts" module>
	import { cva, type VariantProps } from '$lib/ui';

	export const itemVariants = cva({
		base: 'group/item [a]:hover:bg-accent/50 [a]:transition-colors focus-visible:border-ring focus-visible:ring-ring/50 flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:ring-[3px]',
		defaultVariants: {
			size: 'default',
			variant: 'default'
		},
		variants: {
			size: {
				default: 'gap-4 p-4',
				sm: 'gap-2.5 px-4 py-3'
			},
			variant: {
				default: 'bg-transparent',
				muted: 'bg-muted/50',
				outline: 'border-border'
			}
		}
	});

	export type ItemSize = VariantProps<typeof itemVariants>['size'];
	export type ItemVariant = VariantProps<typeof itemVariants>['variant'];
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import type { WithElementRef } from '$lib/ui';

	let {
		child,
		class: className,
		ref = $bindable(null),
		size,
		variant,
		...restProps
	}: {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
		size?: ItemSize;
		variant?: ItemVariant;
	} & WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

	const mergedProps = $derived({
		class: itemVariants({ className, size, variant }),
		'data-size': size,
		'data-slot': 'item',
		'data-variant': variant,
		...restProps
	});
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div bind:this={ref} {...mergedProps}>
		{@render mergedProps.children?.()}
	</div>
{/if}
