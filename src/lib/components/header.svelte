<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { cn, type WithElementRef } from '$lib/ui';

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<header
	bind:this={ref}
	class={cn('container-mobile h-14 rounded-b-xl border-b bg-card p-3', className)}
	{...restProps}
>
	{@render children?.()}
</header>
