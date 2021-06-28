<script>
  import SettingsIcon from '../../icons/Settings.svelte';
  import { settingsMenuOpen } from '../../stores';
</script>

<button 
  disabled={$settingsMenuOpen}
  on:click={() => $settingsMenuOpen = true}
>
  <SettingsIcon />
</button>

<style>
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
</style>