<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/ui/sonner';
	import ViewTransitions from '$lib/ui/view-transitions.svelte';

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true
			});
		}
	});

	const webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
	let { children } = $props();
</script>

<svelte:head>
	<link href={favicon} rel="icon" />
	{@html webManifest}
</svelte:head>

<Toaster />
<ViewTransitions />
<ModeWatcher />
<main class="mb-16">
	{@render children()}
</main>
