<script lang="ts">
  import { addSong, db } from "$lib/db";
  import { liveQ } from "$lib/db/index.svelte";

  const songs = liveQ(() => db.songs.toArray());
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a>to read the
  documentation
</p>
<form
  method="POST"
  onsubmit={(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget, e.submitter);
    const title = formData.get("title") as string;
    const lyrics = formData.get("lyrics") as string;
    addSong({ title, lyrics });
  }}
>
  <input type="text" name="title" placeholder="Title">
  <input type="text" name="lyrics" placeholder="Lyrics">
  <button type="submit">Add Song</button>
</form>
{JSON.stringify(songs.current)}
