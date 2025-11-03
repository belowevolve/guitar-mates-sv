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
	class={cn('flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none', className)}
	data-slot="item-content"
	{...restProps}
>
	{@render children?.()}
</div>
