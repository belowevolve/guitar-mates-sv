<script lang="ts">
	import MusicIcon from '@lucide/svelte/icons/music';
	import PlusIcon from '@lucide/svelte/icons/plus';

	import { Button } from '$lib/ui/button';
	import * as Empty from '$lib/ui/empty';
</script>

<Empty.Root class="border-t border-solid bg-linear-to-b from-muted/50 from-30% to-background">
	<Empty.Header>
		<Empty.Media variant="icon">
			<MusicIcon />
		</Empty.Media>
		<Empty.Title>No songs found</Empty.Title>
		<Empty.Description>Create a new song to get started</Empty.Description>
	</Empty.Header>
	<Empty.Content>
		<Button href="/create" size="sm" variant="outline">
			<PlusIcon />
			Create Song
		</Button>
	</Empty.Content>
</Empty.Root>
