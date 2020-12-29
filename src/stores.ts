import { writable, derived } from 'svelte/store';
import type { Writable, Readable } from 'svelte/store';

import { emptyGenerator, empty, stringify, debounce, evaluateExpression } from './utils';

import { getSteps } from './steps/stepThrough';
import { stepTree } from './steps/stepTree';

export interface EqStep {
  step: number[];
  x: any;
  y: any;
}
export type EqEvent = EqStep | boolean | Error | string;

export const iterIsExhausted: Writable<boolean> = writable(true);

export const events: Writable<EqEvent[]> = writable([]);
export const lastEvent: Writable<IteratorResult<EqStep, boolean>> = writable(null);
lastEvent.subscribe(event => {
  if (!event || event.value == null) {
    iterIsExhausted.set(true);
    return;
  }

  const { value } = event;

  if (typeof value === 'boolean' || value instanceof Error) {
    iterIsExhausted.set(true);
  }

  const newSteps = typeof value === 'boolean' || value instanceof Error 
    ? [] 
    : value.step;
  
  stepArr.set(newSteps)
  
  events.update(oldEvents => {
    if (newSteps.length === 1 && typeof value === 'object') {
      const x = stringify(value.x);
      const y = stringify(value.y);
      console.log('Running with', { x: value.x, y: value.y });

      return [...oldEvents, `Running with \`x=${x}\` and \`y=${y}\``, value];
    }

    return [...oldEvents, value];
  });
});


export const stepArr: Writable<number[]> = writable([]);

export const xText: Writable<string> = writable('');
export const yText: Writable<string> = writable('');

// take text and retrieve value by using new Function()
function getValFromString(text: string, set: (value: any) => void) {
  if (!text) {
    set(empty)
    return;
  }

  evaluateExpression(
    text,
    set,
    () => set(empty)
  );
}


export const xValue: Readable<any> = derived(xText, getValFromString);
export const yValue: Readable<any> = derived(yText, getValFromString);

export const iterTrigger: Writable<any> = writable(null);
export const stepIter: Readable<Generator<EqStep, boolean, never>> = derived(
  [xValue, yValue, iterTrigger], 
  ([x, y]) => {
    if ([empty, document.all].some(type => [x, y].includes(type))) {
      iterIsExhausted.set(true);
      return emptyGenerator;
    }

    iterIsExhausted.set(false);
    return getSteps(stepTree, x, y);
  }
);

export const urlFragment: Readable<string> = derived(
  [xText, yText, xValue, yValue], 
  ([x, y, xVal, yVal]) => {
    if (xVal === empty || yVal === empty) return '';
    return JSON.stringify([x, y]);
  }
);

let hashChecked = false;
function checkHashForData() {
  const hash = window.location.hash.slice(1);
  hashChecked = true;

  if (!hash) return;
  try {
    const arr = JSON.parse(`[${decodeURI(hash)}]`);
    // if not an array of 2 strings, exit
    if (arr.length !== 2) return;
    if (arr.some((text: any) => typeof text !== 'string')) return;
    
    const [x, y] = arr;
    xText.set(x);
    yText.set(y);
  } catch(e) {}
}
checkHashForData()

const updateHash = debounce((fragment: string) => {
  // do not update hash until we have verified it is safe to do so
  if (!hashChecked) return;
  window.location.hash = fragment.slice(1, -1);
}, 500);
urlFragment.subscribe(updateHash);