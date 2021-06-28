<script lang="ts">
  import ExprInput from './ExprInput.svelte';
  import { 
    xValue, yValue, xText, yText, 
    iterIsExhausted, stepIter, lastEvent 
  } from '../../stores';

  function handleSubmit() {
    if ($iterIsExhausted) return;
    $lastEvent = $stepIter.next()
  }
</script>

<form class="inputs" on:submit|preventDefault={handleSubmit}>
  <ExprInput 
    placeholder="x value" 
    bind:text={$xText}
    value={$xValue}
  />
  <span>==</span>
  <ExprInput 
    placeholder="y value" 
    bind:text={$yText}
    value={$yValue}
  />
  <input type="submit">
</form>

<style>
  .inputs {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-gap: 5px;
    align-items: center;
    
    max-width: 600px;
  }
  @media screen and (max-width: 650px) {
    .inputs :global(input) {
      width: 100%;
    }
  }
  span {
    padding-bottom: 10px;
  }
  input {
    display: none;
  }
</style>