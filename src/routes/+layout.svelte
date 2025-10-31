<script lang="ts">
  import "../app.css";
  import { pwaInfo } from "virtual:pwa-info";
  import { onMount } from "svelte";
  import favicon from "$lib/assets/favicon.svg";

  onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import("virtual:pwa-register");
      registerSW({
        immediate: true,
        onOfflineReady() {
          console.log("SW is ready to work offline");
        },
        onRegistered(r) {
          // uncomment following code if you want check for updates
          // r && setInterval(() => {
          //    console.log('Checking for sw update')
          //    r.update()
          // }, 20000 /* 20s for testing purposes */)
          console.log(`SW Registered: ${r}`);
        },
        onRegisterError(error: unknown) {
          console.log("SW registration error", error);
        },
      });
    }
  });

  const webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : "");
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon}>
  {@html webManifest}
</svelte:head>

<main>{@render children()}</main>
