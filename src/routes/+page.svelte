<script lang="ts">
	import { goto } from '$app/navigation';
	import { Debounced } from 'runed';

	import Container from '$lib/components/container.svelte';

	import ActionBar from './_ui/action-bar.svelte';
	import Empty from './_ui/empty.svelte';
	import Header from './_ui/header.svelte';
	import SongCard from './_ui/song-card.svelte';

	let { data } = $props();

	const songs = $derived(data.songs);
	let q = $state(data.query);
	const debouncedQ = new Debounced(() => q);
	$effect(() => {
		if (debouncedQ.current === data.query) return;
		goto(debouncedQ.current ? `?q=${encodeURIComponent(debouncedQ.current)}` : '/', {
			keepFocus: true
		});
	});
</script>

<Header />
<Container class="flex flex-col gap-2">
	{#each songs as song (song.id)}
		<SongCard {song} />
	{:else}
		<Empty {q} />
	{/each}
</Container>

<ActionBar isEmptyResults={!songs.length} bind:q />
