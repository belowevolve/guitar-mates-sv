<script>
	import SearchIcon from '@lucide/svelte/icons/search';
	import XIcon from '@lucide/svelte/icons/x';
	import { fly } from 'svelte/transition';

	import * as InputGroup from '$lib/ui/input-group';

	let { q = $bindable('') } = $props();
</script>

<footer class="fixed inset-x-0 bottom-1 containter-mobile max-w-mobile-sm shadow-2xl">
	<InputGroup.Root class="bg-background">
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
</footer>
