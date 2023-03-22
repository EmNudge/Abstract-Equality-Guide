<script lang="ts">
	import { onDestroy, tick } from 'svelte';
  import { stepIter, lastEvent, events, iterIsExhausted, clearStepperState } from '../../stores';

  function step() {
    $lastEvent = $stepIter.next()
  }

  let showPressed = false;
  const unsub = lastEvent.subscribe(async () => {
    showPressed = false;
    await tick();
    showPressed = true;
    setTimeout(() => showPressed = false, 500);
  });
  onDestroy(unsub);
</script>

<button 
  disabled={!$events.length}
  on:click={clearStepperState}
>Restart</button>

<button 
  disabled={$iterIsExhausted}
  on:click={step}
  class:pressed={showPressed}
>Step Forward</button>

<style>
  .pressed {
    animation: press .5s forwards;
  }

  @keyframes press {
    0% {
      transform: scale(1);
      outline: 1px solid transparent;
    }
    10% {
      transform: scale(1.1);
      outline: 1.5px solid black;
    }
    100% {
      transform: scale(1);
      outline: 1px solid transparent;
    }
  }
</style>