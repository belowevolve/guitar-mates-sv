<script lang="ts">
	import type { Song } from '$lib/db';
	import type { CardProps } from '$lib/ui/card/card.svelte';

	import { Button } from '$lib/ui/button';
	import * as Card from '$lib/ui/card';

	let {
		handleDeleteSong,
		song,
		...props
	}: { handleDeleteSong: (id: string) => void; song: Song } & CardProps = $props();
</script>

<Card.Root {...props}>
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
	<Button onclick={() => handleDeleteSong(song.id)} variant="destructive">Delete</Button>
</Card.Root>
