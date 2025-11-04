<script lang="ts">
	import { goto } from '$app/navigation';

	import { deleteSong } from '$lib/db';
	import { Button } from '$lib/ui/button';

	import Header from './_ui/header.svelte';
	let { data } = $props();

	const song = $derived(data.song);

	const handleDeleteSong = async () => {
		await deleteSong(data.song.id);
		goto('/');
	};
</script>

<Header {song} />
<p>{song.lyrics}</p>
<Button onclick={handleDeleteSong}>Delete</Button>
