<script lang="ts">
	import { invalidateAll, replaceState } from '$app/navigation';
	import { Debounced } from 'runed';

	import Empty from './_ui/empty.svelte';
	import Footer from './_ui/footer.svelte';
	import SongCard from './_ui/song-card.svelte';

	import { db, deleteSong } from '$lib/db';
	import { liveQ } from '$lib/db/index.svelte';

	let { data } = $props();

	let q = $state(data.query);
	const debouncedQ = new Debounced(() => q);

	const songs = liveQ(
		() => db.songs.where('title').startsWithIgnoreCase(debouncedQ.current).toArray(),
		() => [debouncedQ.current],
		{
			initialValue: data.songs
		}
	);

	$effect(() => {
		if (debouncedQ.current === data.query) return;
		replaceState(debouncedQ.current ? `?q=${encodeURIComponent(debouncedQ.current)}` : '/', {
			keepFocus: true
		});
	});

	async function handleDeleteSong(id: string) {
		await deleteSong(id);
		invalidateAll();
	}
</script>

<main class="mb-16 flex flex-col gap-2">
	{#each songs.current as song (song.id)}
		<SongCard {handleDeleteSong} {song} />
	{:else}
		<Empty />
	{/each}
</main>

<Footer isEmptyResults={!songs.current?.length} bind:q />
