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
		'flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm',
		className
	)}
	data-slot="card"
	{...restProps}
>
	{@render children?.()}
</div>
