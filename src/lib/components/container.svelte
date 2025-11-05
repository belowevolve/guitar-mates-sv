<script lang="ts">
	import { cn, type DivProps } from '$lib/ui';

	let { children, class: className, ref = $bindable(null), ...restProps }: DivProps = $props();
</script>

<div bind:this={ref} class={cn('container-mobile mt-2', className)} {...restProps}>
	{@render children?.()}
</div>
