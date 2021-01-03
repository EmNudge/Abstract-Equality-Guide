import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

// should only be a serializable value. 
// One with toJSON() and one that can be parsed back
export function writableFromStorage<T>(startingValue: T, name: string): Writable<T> {
  const item = localStorage.getItem(name);
  const startVal = item ? JSON.parse(item) : startingValue;
  
  const store = writable(startVal);
  store.subscribe(val => {
    localStorage.setItem(name, JSON.stringify(val));
  });

  return store;
}