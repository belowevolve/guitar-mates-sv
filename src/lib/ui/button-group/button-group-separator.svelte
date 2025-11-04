<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { cn } from '$lib/ui';
	import { Separator } from '$lib/ui/separator';

	let {
		class: className,
		orientation = 'vertical',
		ref = $bindable(null),
		...restProps
	}: ComponentProps<typeof Separator> = $props();
</script>

<Separator
	class={cn('relative !m-0 self-stretch bg-input data-[orientation=vertical]:h-auto', className)}
	data-slot="button-group-separator"
	{orientation}
	bind:ref
	{...restProps}
/>
