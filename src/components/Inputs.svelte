<script lang="ts">
  import ExprInput from './ExprInput.svelte';
  import { 
    xValue, yValue, xText, yText, 
    iterIsExhausted, stepIter, lastEvent 
  } from '../stores';

  function handleSubmit() {
    if ($iterIsExhausted) return;
    $lastEvent = $stepIter.next()
  }
</script>

<form class="inputs" on:submit|preventDefault={handleSubmit}>
  <ExprInput 
    placeholder="x value" 
    bind:text={$xText}
    on:express={e => $xValue = e.detail.value} 
  />
  <span>==</span>
  <ExprInput 
    placeholder="y value" 
    bind:text={$yText}
    on:express={e => $yValue = e.detail.value} 
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
    margin: 0 auto;
  }
  span {
    padding-bottom: 10px;
  }
  input {
    display: none;
  }
</style>