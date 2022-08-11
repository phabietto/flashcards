<script lang="ts">
    export let fill: string = 'none';
    export let stroke: string = 'currentColor';
    export let type: string = 'stroke';
    export let disabled: boolean = false;

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
class="f-icon w-8 h-8 flex items-center justify-center rounded-full cursor-pointer 
       text-gray-600 fill-gray-600 
       {disabled ? 'text-gray-300 fill-gray-300 cursor-auto' : 'hover:text-blue-500 hover:fill-blue-500 hover:bg-blue-300/25'}
       {$$props.class}"  
title={$$props.title}
on:click
>
    <span class="h5 w-5">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {fill} {stroke} stroke-width="2">
            <slot></slot>
        </svg>
    </span>
</div>
