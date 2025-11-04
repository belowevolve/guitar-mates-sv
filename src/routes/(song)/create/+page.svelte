<script lang="ts">
	import SearchIcon from '@lucide/svelte/icons/search';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';

	import ActionBar from '$lib/components/action-bar.svelte';
	import BackButton from '$lib/components/back-button.svelte';
	import { addSong } from '$lib/db';
	import { Button } from '$lib/ui/button';
	import * as ButtonGroup from '$lib/ui/button-group';
	import * as Field from '$lib/ui/field';
	import * as InputGroup from '$lib/ui/input-group';
	import { Textarea } from '$lib/ui/textarea';

	async function handleAddSong(title: string, lyrics: string) {
		await addSong({ lyrics, title });
		goto('/');
	}

	let title = $state(page.url.searchParams.get('title') || '');
	let lyrics = $state('');
</script>

<main class="containter-mobile">
	<form
		method="POST"
		onsubmit={(e) => {
			e.preventDefault();
			handleAddSong(title, lyrics);
		}}
	>
		<Field.Group>
			<Field.Set>
				<Field.Legend class="flex w-full items-center gap-2">
					<BackButton />
					Song tabs
				</Field.Legend>

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
						<Textarea id="lyrics" placeholder="Lyrics" required />
					</Field.Field>
				</Field.Group>
			</Field.Set>
			<ActionBar>
				<Button type="submit">Save Song</Button>
			</ActionBar>
		</Field.Group>
	</form>
</main>
