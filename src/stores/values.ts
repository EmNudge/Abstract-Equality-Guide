import { writable, derived } from 'svelte/store';
import type { Writable, Readable } from 'svelte/store';

import { emptyGenerator, empty, stringify, debounce, evaluateExpression } from '../utils';

import { getSteps } from '../steps/stepThrough';
import { stepTree } from '../steps/stepTree';

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