<script lang="ts">
	import { replaceState } from '$app/navigation';
	import { Debounced } from 'runed';

	import { db } from '$lib/db';
	import { liveQ } from '$lib/db/index.svelte';

	import ActionBar from './_ui/action-bar.svelte';
	import Empty from './_ui/empty.svelte';
	import Header from './_ui/header.svelte';
	import SongCard from './_ui/song-card.svelte';

	let { data } = $props();

	let q = $state(data.query);
	const debouncedQ = new Debounced(() => q);
	$effect(() => {
		if (debouncedQ.current === data.query) return;
		replaceState(debouncedQ.current ? `?q=${encodeURIComponent(debouncedQ.current)}` : '/', {
			keepFocus: true
		});
	});

	const songs = liveQ(
		() => db.songs.where('title').startsWithIgnoreCase(debouncedQ.current).toArray(),
		() => [debouncedQ.current],
		{
			initialValue: data.songs
		}
	);
</script>

{#if !songs.current?.length}
	<Empty />
{:else}
	<Header />
	<div class="containter-mobile mt-2 flex flex-col gap-2">
		{#each songs.current as song (song.id)}
			<SongCard {song} />
		{/each}
	</div>
{/if}

<ActionBar isEmptyResults={!songs.current?.length} bind:q />
