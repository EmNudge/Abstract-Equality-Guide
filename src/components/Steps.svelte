<script lang="ts">
  import { steps } from './steps';
  import Step from './Step.svelte';

  import { stepArr } from '../stores';

  const X_COLOR = 'var.token-x { background: var(--highlight-color); }';
  const Y_COLOR = 'var.token-y { background: var(--highlight-color); }';
  let currColor = '';
  $: style = `<style>${currColor}</style>`;

  function handleClick(e) {
    const { className } = e.target;
    if (!className.includes('token')) return;

    if (className.includes('-x')) {
      if (currColor === X_COLOR) {
        currColor = '';
      } else {
        currColor = X_COLOR;
      }
    } else {
      if (currColor === Y_COLOR) {
        currColor = '';
      } else {
        currColor = Y_COLOR;
      }
    }
  }
</script>

{@html style}

<ol on:click={handleClick} {style}>
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