<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';

	import Footer from './footer.svelte';

	import { addSong, deleteSong } from '$lib/db';
	import { Button } from '$lib/ui/button';
	import * as Card from '$lib/ui/card';

	let { data } = $props();

	let q = $state(data.query);

	$effect(() => {
		if (q === data.query) return;
		let timer = setTimeout(() => {
			goto(q ? `?q=${encodeURIComponent(q)}` : '/', {
				keepFocus: true,
				replaceState: true
			});
		}, 250);
		return () => clearTimeout(timer);
	});

	async function handleAddSong(title: string, lyrics: string) {
		await addSong({ lyrics, title });
		invalidateAll();
	}

	async function handleDeleteSong(id: string) {
		await deleteSong(id);
		invalidateAll();
	}
</script>

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
	<input name="title" placeholder="Title" type="text" />
	<input name="lyrics" placeholder="Lyrics" type="text" />
	<Button type="submit">Add Song</Button>
</form>
<main class="mb-16">
	{#each data.songs as song (song.id)}
		<div in:fade={{ duration: 100 }} out:fly={{ x: -100 }}>
			<Card.Root>
				<Card.Header>
					<a href={`/offline-song?id=${song.id}`}>
						<Card.Title style="view-transition-name: song-title-{song.id};">{song.title}</Card.Title
						>
					</a>
				</Card.Header>

				{#if song.lyrics}
					<div style="margin-top: 0.5em; color: #666;">
						{song.lyrics}
					</div>
				{/if}
				<Button onclick={() => handleDeleteSong(song.id)} variant="destructive">Delete</Button>
			</Card.Root>
		</div>
	{/each}
</main>
<Footer {q} />
