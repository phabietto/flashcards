<script lang="ts">
  export let title = "";
  export let description = "";
  export let selected = false;
  export let type: string = 'stroke';

  let fill = 'none';
  let stroke = 'none';

  const hasSlot = $$props.$$slots && $$props.$$slots !== undefined;

$:{
    switch(type){
        case "fill":
            fill = 'currentFill';
            stroke = 'none'
            break;
        case "both":
            fill = 'currentFill';
            stroke = 'currentColor'
            break;
        case "stroke":
        default:
            fill = 'none';
            stroke = 'currentColor'
            break;
    }
}    

</script>

<div 
class="bg-white text-gray-600 fill-gray-600 flex justify-start items-stretch h-20 space-x-1 rounded-md shadow-sm cursor-pointer 
      hover:shadow-blue-500/50 hover:text-blue-500 hover:fill-blue-500  {$$props.class}"
class:selected
on:click
>
  {#if hasSlot}
  <div class="h-full flex justify-center items-center px-2">
    <div class="h-8 w-8">
      <svg
        {fill} {stroke} stroke-width="1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <slot />
      </svg>
    </div>
  </div>
  {/if}
  <div class="w-2/3 flex-grow flex flex-col justify-evenly pr-1 text-gray-700">
    <h5 class="text-left font-bold text-sm mt-1">{title}</h5>
    <span class="h-9 text-left text-xs text-gray-500 multiline-clamp">{@html description}</span>
  </div>
</div>

<style>
  .selected { @apply fill-blue-500 text-blue-500 shadow-blue-500/75 cursor-default hover:shadow-blue-500/50 hover:fill-blue-500 }
  .multiline-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>