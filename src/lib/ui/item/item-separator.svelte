<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { cn } from '$lib/ui';
	import { Separator } from '$lib/ui/separator/index.js';

	let {
		class: className,
		ref = $bindable(null),
		...restProps
	}: ComponentProps<typeof Separator> = $props();
</script>

<Separator
	class={cn('my-0', className)}
	data-slot="item-separator"
	orientation="horizontal"
	bind:ref
	{...restProps}
/>
