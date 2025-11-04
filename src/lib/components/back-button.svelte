<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';

	import { Button, type ButtonProps } from '$lib/ui/button';

	let { children, ...props }: ButtonProps = $props();
</script>

<Button onclick={() => history.back()} size="icon" variant="outline" {...props}>
	{#if children}
		{@render children()}
	{:else}
		<ArrowLeftIcon />
	{/if}
</Button>
