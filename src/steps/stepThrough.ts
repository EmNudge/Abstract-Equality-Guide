import { stepTree } from './stepTree';
import type { Step } from './stepTree'

export function* getSteps(steps: Iterable<Step> | Step[], x: any, y: any, stepArr = []): Generator<Event, boolean | Error> {
  let i = 0;

  for (const step of steps) {
    i++;

    if (!step.cond(x, y)) continue;
    
    const currStepArr = [...stepArr, i];

    yield { step: currStepArr, x, y };
    
    if (step.do instanceof Array) {
      // if this step is an array, we need to go deeper, but end immediately
      const iter = keepLast(getSteps(step.do, x, y, currStepArr));
      yield* iter;
      return iter.next().value as boolean;
    } 
    
    let val: boolean | { x: any, y: any };
    try {
      val = step.do(x, y);
    } catch (e) {
      return e; 
    }

    yield { step: [...currStepArr, 1], x, y };
    
    if (typeof val === 'object') {
      // type is object - signal for us to start from scratch
      const iter = keepLast(getSteps(stepTree, val.x, val.y));
      yield* iter;
      return iter.next().value as boolean;
    }

    return val;
  }
  
  return false;
}

export interface Event {
  step: number[];
  x: any;
  y: any;
};

// utility function to hold last value of a generator
function keepLast<T, U, V>(iter: Generator<T, U, V>): Generator<T, U, V> {
  let lastValue: IteratorResult<T, U> = null;

  const newIter = {
    next(value: V) {
      // keep returning last value if done
      if (lastValue && lastValue.done) return lastValue;

      const val = iter.next(value);
      if (val.done) lastValue = val;
      return val;
    },
    [Symbol.iterator]() { 
      return newIter; 
    },
    return(value: U): IteratorResult<T, U> {
      lastValue.done = true;
      return iter.return(value);
    },
    throw(value: V) {
      return iter.throw(value);
    }
  };

  return newIter;
}