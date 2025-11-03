<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	import favicon from '$lib/assets/favicon.svg';
	import ViewTransitions from '$lib/ui/view-transitions.svelte';

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r) {
					// uncomment following code if you want check for updates
					// r && setInterval(() => {
					//    console.log('Checking for sw update')
					//    r.update()
					// }, 20000 /* 20s for testing purposes */)
					console.log(`SW Registered: ${r}`);
				},
				onRegisterError(error: unknown) {
					console.log('SW registration error', error);
				}
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

<ViewTransitions />
<div class="containter-mobile">
	{@render children()}
</div>
