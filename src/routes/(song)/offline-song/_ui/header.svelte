<script lang="ts">
	import { fly } from 'svelte/transition';

	import type { Song } from '$lib/db';

	import BackButton from '$lib/components/back-button.svelte';
	import Header from '$lib/components/header.svelte';

	let { song }: { song: Song } = $props();
</script>

<Header class="flex items-center gap-2">
	<div in:fly={{ x: -10 }}>
		<BackButton />
	</div>
	<h1 style="view-transition-name: song-title-{song.id};" class="flex flex-1 text-2xl font-bold">
		{song.title}
	</h1>
</Header>
