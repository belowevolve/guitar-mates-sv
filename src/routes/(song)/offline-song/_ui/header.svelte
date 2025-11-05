<script lang="ts">
	import TrashIcon from '@lucide/svelte/icons/trash';
	import { goto } from '$app/navigation';

	import BackButton from '$lib/components/back-button.svelte';
	import Header from '$lib/components/header.svelte';
	import { deleteSong, type Song } from '$lib/db';
	import { Button } from '$lib/ui/button';

	let { song }: { song: Song } = $props();

	const handleDeleteSong = async () => {
		await deleteSong(song.id);
		goto('/');
	};
</script>

<Header class="flex items-center gap-2">
	<BackButton />
	<h1 style="view-transition-name: song-title-{song.id};" class="flex flex-1 text-2xl font-bold">
		{song.title}
	</h1>
	<Button onclick={handleDeleteSong} size="icon" variant="outline">
		<TrashIcon />
	</Button>
</Header>
