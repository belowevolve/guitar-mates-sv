<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import type { WithElementRef } from '$lib/ui';

	import { cn } from '$lib/ui';

	let {
		children,
		class: className,
		ref = $bindable(null),
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
</script>

<p
	bind:this={ref}
	class={cn(
		'line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground',
		'[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
		className
	)}
	data-slot="item-description"
	{...restProps}
>
	{@render children?.()}
</p>
