<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import { addSong } from '$lib/db';
	import { Button } from '$lib/ui/button';

	async function handleAddSong(title: string, lyrics: string) {
		await addSong({ lyrics, title });
		goto('/');
	}

	let title = $state(page.url.searchParams.get('title') || '');
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
	<input name="title" placeholder="Title" type="text" value={title} />
	<input name="lyrics" placeholder="Lyrics" type="text" />
	<Button type="submit">Add Song</Button>
</form>
