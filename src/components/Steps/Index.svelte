<script lang="ts">
  import { steps } from './steps';
  import Step from './Step.svelte';
  import { dedent } from '../../utils';
  import { stepArr } from '../../stores';

  enum Color {
    x = 'x',
    y = 'y',
    none = '',
  }
  let currColor: Color = Color.none;
  $: style = currColor === '' 
    ? `<style></style>` 
    : dedent(`
      <style>
        var.token-${currColor} {
          background: var(--highlight-color);
        }
      </style>
    `);

  function handleClick(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    const { className } = e.target;
    if (!className.includes('token')) return;

    const classColor: Color = className.slice(-1) as Color;
    currColor = classColor === currColor 
      ? Color.none 
      : classColor;
  }
</script>

{@html style}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<ol on:click={handleClick} class="steps-holder">
  {#each steps as step, i}
    <Step {step} stepArr={$stepArr} index={i} />
  {/each}
</ol>

<style>
  .steps-holder {
    font-family: Cambria, Palatino Linotype, Palatino, Liberation Serif, serif;
    line-height: 1.5em;
    font-size: 18px;
    margin-top: 0;
    overflow: auto;
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
  ol :global(a) {
    color: inherit;
  }
</style>