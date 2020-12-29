<script lang="ts">
  import { evaluateExpression } from '../utils/evaluateExpression';
  import { createEventDispatcher } from 'svelte';
  import { empty } from '../utils/empty'

	const dispatch = createEventDispatcher();

  export let placeholder = "value";

  let item: string = '';
  let errText = '';
  
  function handleText() {
    evaluateExpression(
      item, 
      expr => {
        if (expr === document.all) {
          errText = 'please don\'t put that there ☹';
          dispatch('express', { value: empty });
          return;
        }
        
        dispatch('express', { value: expr });
        errText = '';
      }, 
      () => {
        errText = 'invalid expression';
        dispatch('express', { value: empty });
      }
    );
    return true;
  }

</script>

<div class="input">
  <input type="text" spellcheck={false} {placeholder} bind:value={item} on:input={handleText}>
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