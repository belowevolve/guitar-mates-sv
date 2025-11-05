<script lang="ts">
	import Container from '$lib/components/container.svelte';

	import Header from './_ui/header.svelte';
	let { data } = $props();

	const song = $derived(data.song);
</script>

<Header {song} />
<Container>
	<p>{song.lyrics}</p>
</Container>
