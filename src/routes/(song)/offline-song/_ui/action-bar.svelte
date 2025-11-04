<script lang="ts">
	import PlusIcon from '@lucide/svelte/icons/plus';
	import SearchIcon from '@lucide/svelte/icons/search';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import XIcon from '@lucide/svelte/icons/x';
	import { fly } from 'svelte/transition';

	import ActionBar from '$lib/components/action-bar.svelte';
	import { Button } from '$lib/ui/button';
	import * as InputGroup from '$lib/ui/input-group';

	let { isEmptyResults, q = $bindable('') }: { isEmptyResults: boolean; q: string } = $props();
</script>

<ActionBar>
	<InputGroup.Root class="bg-input/30">
		<InputGroup.Input
			name="q"
			class="input-search"
			placeholder="Search"
			type="search"
			bind:value={q}
		/>
		<InputGroup.Addon>
			<SearchIcon />
		</InputGroup.Addon>
		<InputGroup.Addon align="inline-end">
			{#if q}
				<div in:fly={{ x: 5 }} out:fly={{ x: 5 }}>
					<InputGroup.Button aria-label="Clear" onclick={() => (q = '')} size="icon-xs">
						<XIcon />
					</InputGroup.Button>
				</div>
			{/if}
		</InputGroup.Addon>
	</InputGroup.Root>
	<Button
		class={{ 'bg-input/30': !isEmptyResults }}
		href={`/create${isEmptyResults ? `?title=${q}` : ''}`}
		size="icon"
		variant={isEmptyResults ? 'default' : 'outline'}
	>
		<PlusIcon />
	</Button>
	<Button class="bg-input/30" href="/settings" size="icon" variant="outline">
		<SettingsIcon />
	</Button>
</ActionBar>
