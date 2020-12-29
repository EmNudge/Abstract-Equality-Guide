<script lang="ts">
  import { fly } from 'svelte/transition';
  import { parse } from '../utils/parsemd';
  import { events } from '../stores';
</script>

<div>
  {#each $events as event}
    <div class="step" in:fly={{y: -20}} 
      class:final={typeof event === 'boolean' || event instanceof Error}
      class:startover={typeof event === 'string'}
      >
      {#if typeof event === 'boolean'}
        Final Value: <code>{event}</code>
      {:else if event instanceof Error}
        {@html parse(`new \`${event.name}\`: \`${event.message}\``)}
      {:else if typeof event === 'string'}
        {@html parse(event)}
      {:else}
        Step number: <code>{event.step.join(', ')}</code>
      {/if}
    </div>
  {/each}
</div>

<style>
  .step {
    padding: 5px;
    margin: 5px;
  }
  .final {
    background: #e5e5ff;
  }
  .startover {
    background: #ebffeb;
  }
</style>