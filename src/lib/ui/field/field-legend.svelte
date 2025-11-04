<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn, type WithElementRef } from '$lib/ui';

	let {
		children,
		class: className,
		ref = $bindable(null),
		variant = 'legend',
		...restProps
	}: {
		variant?: 'label' | 'legend';
	} & WithElementRef<HTMLAttributes<HTMLLegendElement>> = $props();
</script>

<legend
	bind:this={ref}
	class={cn(
		'mb-3 font-medium',
		'data-[variant=legend]:text-base',
		'data-[variant=label]:text-sm',
		className
	)}
	data-slot="field-legend"
	data-variant={variant}
	{...restProps}
>
	{@render children?.()}
</legend>
