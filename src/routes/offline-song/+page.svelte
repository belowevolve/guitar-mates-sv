<script lang="ts">
	let { data } = $props();
</script>

<button onclick={() => history.back()}>Back</button>
<h1 style="view-transition-name: song-title-{data.song.id};">{data.song.title}</h1>
<p>{data.song.lyrics}</p>
