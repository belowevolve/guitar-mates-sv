<script lang="ts">
	import GuitarIcon from '@lucide/svelte/icons/guitar';
	import { fly } from 'svelte/transition';

	import Header from '$lib/components/header.svelte';
	import { Button } from '$lib/ui/button';
</script>

<Header class="flex items-center gap-2">
	<Button href="/create" size="icon-sm" variant="outline">
		<GuitarIcon />
	</Button>
	<h1 class="text-2xl font-bold" in:fly={{ x: -10 }}>Songs</h1>
</Header>
