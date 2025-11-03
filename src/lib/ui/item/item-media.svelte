<script lang="ts" module>
	import { cva, type VariantProps } from '$lib/ui';

	export const itemMediaVariants = cva({
		base: 'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none',
		defaultVariants: {
			variant: 'default'
		},
		variants: {
			variant: {
				default: 'bg-transparent',
				icon: "bg-muted size-8 rounded-sm border [&_svg:not([class*='size-'])]:size-4",
				image: 'size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover'
			}
		}
	});

	export type ItemMediaVariant = VariantProps<typeof itemMediaVariants>['variant'];
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import type { WithElementRef } from '$lib/ui';

	let {
		children,
		class: className,
		ref = $bindable(null),
		variant = 'default',
		...restProps
	}: { variant?: ItemMediaVariant } & WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	class={itemMediaVariants({ className, variant })}
	data-slot="item-media"
	data-variant={variant}
	{...restProps}
>
	{@render children?.()}
</div>
