<script lang="ts">
  import { steps } from './steps';
  import Step from './Step.svelte';

  import { stepArr } from '../stores';
</script>

<ol>
  {#each steps as step, i}
    <Step {step} stepArr={$stepArr} index={i} />
  {/each}
</ol>

<style>
  ol {
    font-family: Cambria, Palatino Linotype, Palatino, Liberation Serif, serif;
    line-height: 1.5em;
    font-size: 18px;
  }
  ol :global(ol) {
    list-style: lower-alpha;
  }
  ol :global(ol ol) {
    list-style: upper-roman;
  }
  ol :global(code) {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    background: #eeee;
    color: #EB5757;
    padding: 2px 8px;
    border-radius: 2px;
  }
</style>