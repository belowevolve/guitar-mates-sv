<script lang="ts" module>
	import { cva, type VariantProps } from '$lib/ui';

	export const emptyMediaVariants = cva({
		base: 'mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0',
		defaultVariants: {
			variant: 'default'
		},
		variants: {
			variant: {
				default: 'bg-transparent',
				icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6"
			}
		}
	});

	export type EmptyMediaVariant = VariantProps<typeof emptyMediaVariants>['variant'];
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
	}: { variant?: EmptyMediaVariant } & WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	class={emptyMediaVariants({ className, variant })}
	data-slot="empty-icon"
	data-variant={variant}
	{...restProps}
>
	{@render children?.()}
</div>
