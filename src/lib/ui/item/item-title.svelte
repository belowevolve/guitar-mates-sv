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
	class={cn('flex w-fit items-center gap-2 text-sm leading-snug font-medium', className)}
	data-slot="item-title"
	{...restProps}
>
	{@render children?.()}
</div>
