<script>
    export let type = "badge";
    const styling = type == "pill" ? "mr-2 rounded-full" : "rounded";
</script>
<span class="inline-flex items-center justify-center px-2 py-1.5 text-xs font-bold leading-none text-blue-100 bg-blue-600 {styling}"><slot></slot></span>