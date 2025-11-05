<script lang="ts">
	import { fly } from 'svelte/transition';

	import BackButton from '$lib/components/back-button.svelte';
	import Header from '$lib/components/header.svelte';
</script>

<Header class="flex items-center gap-2">
	<BackButton />
	<h1 class="text-2xl font-bold" in:fly={{ x: -10 }}>Settings</h1>
</Header>
