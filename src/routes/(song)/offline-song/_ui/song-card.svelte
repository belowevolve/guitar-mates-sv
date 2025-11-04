<script lang="ts">
	import MusicIcon from '@lucide/svelte/icons/music';

	import type { Song } from '$lib/db';

	import * as Item from '$lib/ui/item';

	let { song }: { song: Song } = $props();
</script>

<Item.Root size="sm" variant="card">
	{#snippet child({ props })}
		<a href={`/offline-song?id=${song.id}`} {...props}>
			<Item.Media variant="icon">
				<MusicIcon />
			</Item.Media>
			<Item.Content>
				<Item.Title style="view-transition-name: song-title-{song.id};">{song.title}</Item.Title>
				<Item.Description>{song.createdAt.toLocaleDateString()}</Item.Description>
			</Item.Content>
		</a>
	{/snippet}
</Item.Root>
