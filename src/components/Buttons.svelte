<script lang="ts">
  import { stepIter, lastEvent, events, iterTrigger, iterIsExhausted } from '../stores';
  
  function clear() {
    $events = [];
    $iterTrigger = Symbol();
  }
</script>

<button 
  disabled={!$events.length}
  on:click={clear}
>Restart</button>
<button 
  disabled={$iterIsExhausted}
  on:click={() => $lastEvent = $stepIter.next()}
>Step Forward</button>