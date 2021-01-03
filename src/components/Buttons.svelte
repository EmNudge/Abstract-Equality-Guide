<script lang="ts">
  import { 
    stepIter, lastEvent, events, 
    iterTrigger, iterIsExhausted,
    settingsMenuOpen, 
    autoStepper, autoStepperDelay
  } from '../stores';
  
  let timeoutId: number;
  function stopTimeout() {
    clearTimeout(timeoutId);
  }

  function startAutoStep() {
    function autoStep() {
      $lastEvent = $stepIter.next();
      if ($lastEvent.done) {
        stopTimeout();
        timeoutId = null;
        return;
      }
      
      timeoutId = setTimeout(autoStep, $autoStepperDelay);
    }

    if ($lastEvent?.done) {
      $iterTrigger = Symbol();
    }
    autoStep();
  }

  function clear() {
    stopTimeout();
    timeoutId = null;

    $events = [];
    $iterTrigger = Symbol();
  }

  function step() {
    $lastEvent = $stepIter.next()
  }
</script>

<button 
  disabled={!$events.length}
  on:click={clear}
>Restart</button>

{#if $autoStepper}
  {#if !timeoutId}
    <button on:click={startAutoStep}>Start AutoStep</button>
  {:else}
    <button on:click={stopTimeout}>Pause AutoStep</button>
  {/if}
{:else}
  <button 
    disabled={$iterIsExhausted}
    on:click={step}
  >Step Forward</button>
{/if}

<button 
  disabled={$settingsMenuOpen}
  on:click={() => $settingsMenuOpen = true}
>Open Settings</button>