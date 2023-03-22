import { xText, yText, xValue, yValue } from './index';
import type { Readable } from 'svelte/store';
import { derived, get } from 'svelte/store';
import { empty, debounce } from '../utils';
import { executeFromUrl } from './settings';

export const urlFragment: Readable<string> = derived(
  [xText, yText, xValue, yValue], 
  ([x, y, xVal, yVal]) => {
    if (xVal === empty || yVal === empty) return '';
    return JSON.stringify([x, y]);
  }
);

let hashChecked = false;
function checkHashForData() {
  if (!('window' in globalThis)) return;
  const hash = window.location.hash.slice(1);
  hashChecked = true;

  // if no hash or this action is disallowed
  if (!hash || !get(executeFromUrl)) return;

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