<script lang="ts">
  export let stroke = "stroke-transparent";
  export let title = "";
  export let description = "";

  const hasSlot = $$props.$$slots && $$props.$$slots !== undefined;
</script>

<div class="bg-white flex justify-start items-stretch h-16 my-2 px-4 py-2 rounded-md shadow-sm cursor-pointer fill-gray-700 hover:shadow-blue-300/50 hover:fill-blue-300">
  <div>
    {#if hasSlot}
    <svg
      class="h-11 w-10 {stroke} mt-1"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <slot />
    </svg>
    {/if}
  </div>
  <div class="flex flex-col justify-between text-gray-700">
    <h5 class="text-left font-bold text-sm mt-1">{title}</h5>
    <p class="text-left text-xs text-gray-500">{description}</p>
  </div>
</div>
