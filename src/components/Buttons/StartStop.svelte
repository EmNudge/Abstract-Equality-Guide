<script lang="ts">
  import { 
    stepIter, lastEvent, events, 
    iterTrigger, iterIsExhausted,
    stepArr
  } from '../../stores';

  function clear() {
    $events = [];
    $iterTrigger = Symbol();
    $stepArr = [];
  }

  function step() {
    $lastEvent = $stepIter.next()
  }
</script>

<button 
  disabled={!$events.length}
  on:click={clear}
>Restart</button>

<button 
  disabled={$iterIsExhausted}
  on:click={step}
>Step Forward</button>