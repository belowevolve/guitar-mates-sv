<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { cn } from '$lib/ui';
	import { Input } from '$lib/ui/input';

	let {
		class: className,
		ref = $bindable(null),
		value = $bindable(),
		...props
	}: ComponentProps<typeof Input> = $props();
</script>

<Input
	class={cn(
		'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
		className
	)}
	data-slot="input-group-control"
	bind:ref
	bind:value
	{...props}
/>
