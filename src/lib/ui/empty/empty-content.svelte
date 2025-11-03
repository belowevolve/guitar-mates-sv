<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import type { WithElementRef } from '$lib/ui';

	import { cn } from '$lib/ui';

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	class={cn(
		'flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance',
		className
	)}
	data-slot="empty-content"
	{...restProps}
>
	{@render children?.()}
</div>
