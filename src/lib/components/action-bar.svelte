<script lang="ts">
	import { cn, type DivProps } from '$lib/ui';

	let { children, class: className, ref = $bindable(null), ...restProps }: DivProps = $props();
</script>

<div
	bind:this={ref}
	class={cn('fixed inset-x-0 bottom-2 containter-mobile flex gap-1', className)}
	{...restProps}
>
	{@render children?.()}
</div>
