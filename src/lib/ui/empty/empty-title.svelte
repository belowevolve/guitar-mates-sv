<script lang="ts">
	import type { WithElementRef } from '$lib/ui';
	import { cn } from '$lib/ui';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="empty-title"
	class={cn('text-lg font-medium tracking-tight', className)}
	{...restProps}
>
	{@render children?.()}
</div>
