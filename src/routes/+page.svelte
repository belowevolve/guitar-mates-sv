<script lang="ts">
	import { Button } from '$lib/ui/button';
	import { addSong, db, deleteSong } from '$lib/db';
	import { liveQ } from '$lib/db/index.svelte';

	let search = $state('');
	const songs = liveQ(
		() => db.songs.where('title').startsWithIgnoreCase(search).toArray(),
		() => [search]
	);
</script>

<input type="text" bind:value={search} placeholder="Search" />
{search}
<form
	method="POST"
	onsubmit={(e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget, e.submitter);
		const title = formData.get('title') as string;
		const lyrics = formData.get('lyrics') as string;
		addSong({ title, lyrics });
	}}
>
	<input type="text" name="title" placeholder="Title" />
	<input type="text" name="lyrics" placeholder="Lyrics" />
	<Button type="submit">Add Song</Button>
</form>

{#if songs.current && songs.current.length}
	<div>
		{#each songs.current as song}
			<div
				class="song-card"
				style="margin: 1em 0; padding: 1em; border: 1px solid #ccc; border-radius: 6px;"
			>
				<a
					href={`/song/${song.id}`}
					style="font-weight: bold; text-decoration: none; color: inherit;"
				>
					{song.title}
				</a>
				{#if song.lyrics}
					<div style="margin-top: 0.5em; color: #666;">
						{song.lyrics}
					</div>
				{/if}
				<Button variant="destructive" onclick={() => deleteSong(song.id)}>Delete</Button>
			</div>
		{/each}
	</div>
{:else}
	<p>No songs found.</p>
{/if}
