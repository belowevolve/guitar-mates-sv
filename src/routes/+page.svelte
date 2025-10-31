<script>
  let counter = $state(0);

  // On mount, load from localStorage if exists
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("counter");
    if (stored !== null) {
      counter = Number.parseInt(stored, 10) || 0;
    }
  }

  function increment() {
    counter += 1;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("counter", counter);
    }
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a>to read the
  documentation
</p>
<button
  class="border px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 mt-4"
  onclick={increment}
>
  Add Counter (Current: {counter})
</button>
