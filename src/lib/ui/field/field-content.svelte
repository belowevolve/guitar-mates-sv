<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn, type WithElementRef } from '$lib/ui';

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	class={cn('group/field-content flex flex-1 flex-col gap-1.5 leading-snug', className)}
	data-slot="field-content"
	{...restProps}
>
	{@render children?.()}
</div>
