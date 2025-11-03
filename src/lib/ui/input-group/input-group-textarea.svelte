<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { cn } from '$lib/ui';
	import { Textarea } from '$lib/ui/textarea';

	let {
		class: className,
		ref = $bindable(null),
		value = $bindable(),
		...props
	}: ComponentProps<typeof Textarea> = $props();
</script>

<Textarea
	class={cn(
		'flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent',
		className
	)}
	data-slot="input-group-control"
	bind:ref
	bind:value
	{...props}
/>
