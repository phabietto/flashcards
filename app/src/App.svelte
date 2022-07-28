<script lang="ts">
import ActiveBreakpointIndicator from './components/debug/ActiveBreakpointIndicator.svelte';
import Tailwind from './Tailwind.svelte';
</script>

<style>
  :root {
    --svelte-rgb: 255, 62, 0;
  }
</style>

<Tailwind />

<main class="text-center p-4 mx-0 w-screen">

</main>
<ActiveBreakpointIndicator />