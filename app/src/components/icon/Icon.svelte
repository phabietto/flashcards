<script lang="ts">
    export let type: string = 'stroke';
    export let disabled: boolean = false;

    let fill: string = 'none';
    let stroke: string = 'none';

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
<span class="h5 w-5 {$$props.class} {disabled ? 'text-gray-300 fill-gray-300 cursor-auto' : ''}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {fill} {stroke} stroke-width="2">
        <slot></slot>
    </svg>
</span>
