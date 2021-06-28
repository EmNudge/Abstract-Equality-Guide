<script>
  import { settingsMenuOpen, autoStepper, autoStepperDelay, executeFromUrl } from '../stores';
  import { clickOutside } from '../actions/clickOutside';
</script>

<div class="container">
  <div class="menu" use:clickOutside on:clickoutside={() => $settingsMenuOpen = false}>
    <h1>Settings</h1>

    <div class="inputs">
      <label>
        <span>Auto Stepper</span>
        <input type="checkbox" bind:checked={$autoStepper}>
      </label>

      {#if $autoStepper}
        <label>
          <span>Delay Between Auto Steps (ms)</span>
          <input type="number" bind:value={$autoStepperDelay}>
        </label>
      {/if}
      
      <label>
        <span>Auto-Execute From URL</span>
        <input type="checkbox" bind:checked={$executeFromUrl}>
      </label>
    </div>
  </div>
</div>

<style>
  h1 {
    margin: 0;
    text-align: center;
  }

  .menu {
    background: white;
    width: max(500px, 100%);
    height: 500px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 
      1px 2px 9px 1px #000000ab, 
      0px 0px 20px 20px #00000021;
  }
  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #000a;

    display: grid;
    place-items: center;
  }

  .inputs {
    display: grid;
  }
  label {
    display: grid;
  }
</style>