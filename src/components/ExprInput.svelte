<script lang="ts">
  import { empty } from '../utils/empty'

  export let placeholder = "value";
  export let text = '';
  export let value: any;

  $: errText = getErrText(value);
  
  function getErrText(value: any) {
    if (value === document.all) {
      return 'please don\'t put that there ☹';
    }
    if (text.length && value === empty) {
      return 'invalid expression';
    }
    return '';
  }
</script>

<div class="input">
  <input type="text" spellcheck={false} {placeholder} bind:value={text}>
  <div class="error">{errText}</div>
</div>

<style>
  input {
    margin: 0;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }
  .input {
    display: grid;
    grid-template-rows: 40px 10px;
  }
  .error {
    color: red;
  }
</style>