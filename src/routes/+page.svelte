<script lang="ts">
  import { addSong, db } from "$lib/db";
  import { liveQ } from "$lib/db/index.svelte";

  let search = $state("");
  const songs = liveQ(
    () => db.songs.where("title").startsWithIgnoreCase(search).toArray(),
    () => [search]
  );

  let alert = $state<string | null>(null);
  let firstRender = $state(true);
  $effect(() => {
    if (firstRender && songs.isPending) {
      alert = "1";
    }
    if (!firstRender && songs.isPending) {
      alert = "2";
    }
  });
</script>

<button
  onclick={() => {
  firstRender = false;
}}
>
  Click me
</button>

{JSON.stringify(alert)}
<input type="text" bind:value={search} placeholder="Search">
{search}
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
