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
	class={cn('text-sm text-muted-foreground', className)}
	data-slot="card-description"
	{...restProps}
>
	{@render children?.()}
</p>
