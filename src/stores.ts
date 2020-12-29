import { writable, derived, get  } from 'svelte/store';
import type { Writable, Readable } from 'svelte/store';

import { emptyGenerator } from './utils/generator';
import { empty } from './utils/empty'
import { stringify } from './utils/stringify';

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

// values which influence the iterable when changed
export const xValue: Writable<any> = writable(empty);
export const yValue: Writable<any> = writable(empty);

export const values: Readable<{ x: any, y: any }> = derived([xValue, yValue], ([x, y]) => ({ x, y }));
export const iterTrigger: Writable<any> = writable(null);
export const stepIter: Readable<Generator<EqStep, boolean, never>> = derived([values, iterTrigger], ([{ x, y }]) => {
  if (x === empty || y === empty) {
    iterIsExhausted.set(true);
    return emptyGenerator;
  }

  iterIsExhausted.set(false);
  return getSteps(stepTree, x, y);
});
