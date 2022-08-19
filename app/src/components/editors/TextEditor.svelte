<script lang="ts">
    export let value;
</script>

<div>
    <textarea 
        name="textarea" 
        id="texteditor_" 
        class="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        cols="30" 
        rows="2" 
        bind:value 
        on:click|stopPropagation|preventDefault />
</div>