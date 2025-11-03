<script lang="ts">
	let { data } = $props();
</script>

<a href="/">Back</a>
<h1 style="view-transition-name: song-title-{data.song.id};">{data.song.title}</h1>
<p>{data.song.lyrics}</p>
