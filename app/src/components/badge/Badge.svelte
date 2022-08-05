<script type="ts">
    export let type = "badge";

    const styling = type == "pill" ? "mr-2 rounded-full" : "rounded";
    const title = $$restProps.title
</script>
<span {title} class="inline-flex items-center justify-center px-2 py-1.5 text-xs font-bold leading-none {styling} {$$props.class}" on:click|preventDefault|stopPropagation><slot></slot></span>