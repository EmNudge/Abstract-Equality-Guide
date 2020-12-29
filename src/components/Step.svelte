<script lang="ts">
  import type { Step } from './steps';
  import { parse } from '../utils/parsemd';

  export let step: Step;
  export let index: number;
  export let stepArr: number[] = [];

  $: active = index === stepArr[0] - 1;
</script>

<li class:active>
  {@html parse(step.name)}

  {#if step.substeps && step.substeps.length}
    <ol>
      {#each step.substeps as substep, i}
        <svelte:self 
          step={substep} 
          stepArr={active ? stepArr.slice(1) : []} 
          index={i}
        />
      {/each}
    </ol>
  {/if}
</li>

<style>
  li {
    transition: .25s;
  }
  
  .active {
    background: #9479ff6e;
    padding: 10px;
  }
</style>