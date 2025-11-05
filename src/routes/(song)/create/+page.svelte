<script lang="ts">
	import SearchIcon from '@lucide/svelte/icons/search';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';

	import ActionBar from '$lib/components/action-bar.svelte';
	import Container from '$lib/components/container.svelte';
	import { addSong } from '$lib/db';
	import { Button } from '$lib/ui/button';
	import * as ButtonGroup from '$lib/ui/button-group';
	import * as Field from '$lib/ui/field';
	import * as InputGroup from '$lib/ui/input-group';
	import { Textarea } from '$lib/ui/textarea';

	import Header from './_ui/header.svelte';

	async function handleAddSong(title: string, lyrics: string) {
		await addSong({ lyrics, title });
		goto('/');
	}

	let title = $state(page.url.hash.split('#')[1] || '');
	let lyrics = $state('');
</script>

<Header />
<Container>
	<form
		method="POST"
		onsubmit={(e) => {
			e.preventDefault();
			handleAddSong(title, lyrics);
		}}
	>
		<Field.Group>
			<Field.Set>
				<Field.Group>
					<Field.Field>
						<Field.Label for="title">Song title</Field.Label>
						<ButtonGroup.Root>
							<InputGroup.Root>
								<InputGroup.Input id="title" placeholder="Song title" required bind:value={title} />
							</InputGroup.Root>
							<Button
								onclick={() => {
									toast.info('Will be implemented soon...');
									// const response = await searchLyrics(
									//   encodeURIComponent(songTitle)
									// );
									// if (response.success) {
									//   setLyrics(decodeURIComponent(response.result.lyrics));
									// }
								}}
								tabindex={-1}
								type="button"
								variant="outline"
							>
								<SearchIcon />
							</Button>
						</ButtonGroup.Root>
					</Field.Field>
					<Field.Field>
						<Field.Label for="lyrics">Lyrics</Field.Label>
						<Textarea id="lyrics" placeholder="Lyrics" required bind:value={lyrics} />
					</Field.Field>
				</Field.Group>
			</Field.Set>
			<ActionBar>
				<Button type="submit">Save Song</Button>
			</ActionBar>
		</Field.Group>
	</form>
</Container>
