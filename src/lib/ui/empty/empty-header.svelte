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
	class={cn('flex max-w-sm flex-col items-center gap-2 text-center', className)}
	data-slot="empty-header"
	{...restProps}
>
	{@render children?.()}
</div>
