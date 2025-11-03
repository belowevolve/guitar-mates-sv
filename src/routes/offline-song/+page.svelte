<script lang="ts">
	import { liveQ } from '$lib/db/index.svelte';
	import { page } from '$app/state';
	import { db } from '$lib/db';

	const hash = page.url.hash;
	const id = hash.split('#')[1];
	const song = liveQ(
		() => (id ? db.songs.get(id) : undefined),
		() => [id]
	);
</script>

{JSON.stringify(song.current)}
