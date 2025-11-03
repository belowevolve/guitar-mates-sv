<script lang="ts">
	import { Separator as SeparatorPrimitive } from 'bits-ui';

	import { cn } from '$lib/ui';

	let {
		class: className,
		'data-slot': dataSlot = 'separator',
		ref = $bindable(null),
		...restProps
	}: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root
	class={cn(
		'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
		className
	)}
	data-slot={dataSlot}
	bind:ref
	{...restProps}
/>
