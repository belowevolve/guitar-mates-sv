<script lang="ts">
	import { Button } from '$lib/ui/button';
	import * as Card from '$lib/ui/card';
	import { addSong, deleteSong } from '$lib/db';
	import { goto, invalidateAll } from '$app/navigation';

	let { data } = $props();

	let queryInput = $state(data.query);

	$effect(() => {
		if (queryInput === data.query) return;
		let timer = setTimeout(() => {
			goto(queryInput ? `?q=${encodeURIComponent(queryInput)}` : '/', {
				replaceState: true,
				keepFocus: true
			});
		}, 250);
		return () => clearTimeout(timer);
	});

	async function handleAddSong(title: string, lyrics: string) {
		await addSong({ title, lyrics });
		invalidateAll();
	}

	async function handleDeleteSong(id: string) {
		await deleteSong(id);
		invalidateAll();
	}
</script>

<input type="search" name="q" required placeholder="Search" bind:value={queryInput} />

<form
	method="POST"
	onsubmit={(e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget, e.submitter);
		const title = formData.get('title') as string;
		const lyrics = formData.get('lyrics') as string;
		handleAddSong(title, lyrics);
	}}
>
	<input type="text" name="title" placeholder="Title" />
	<input type="text" name="lyrics" placeholder="Lyrics" />
	<Button type="submit">Add Song</Button>
</form>

{#each data.songs as song (song.id)}
	<Card.Root>
		<Card.Header>
			<a href={`/offline-song?id=${song.id}`}>
				<Card.Title style="view-transition-name: song-title-{song.id};">{song.title}</Card.Title>
			</a>
		</Card.Header>

		{#if song.lyrics}
			<div style="margin-top: 0.5em; color: #666;">
				{song.lyrics}
			</div>
		{/if}
		<Button variant="destructive" onclick={() => handleDeleteSong(song.id)}>Delete</Button>
	</Card.Root>
{/each}
