<script lang="ts">
	import { Button } from '$lib/ui/button';
	import { addSong, db } from '$lib/db';
	import { liveQ } from '$lib/db/index.svelte';
	import { page } from '$app/state';
	const { id } = page.params;
	const song = liveQ(
		() => (id ? db.songs.get(id) : undefined),
		() => [id]
	);
</script>

{JSON.stringify(song.current)}
