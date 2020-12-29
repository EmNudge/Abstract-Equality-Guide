function* gen() {}

export const emptyGenerator: Generator<any, any, any> = gen();

// utility function to hold last value of a generator
export function keepLast<T, U, V>(iter: Generator<T, U, V>): Generator<T, U, V> {
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