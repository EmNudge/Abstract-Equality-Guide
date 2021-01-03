import { writable } from 'svelte/store';
import { writableFromStorage } from '../utils'

export const settingsMenuOpen = writable(false);

export const autoStepper = writableFromStorage(false, 'auto-stepper');

export const autoStepperDelay = writableFromStorage(500, 'auto-stepper-delay');
export const executeFromUrl = writableFromStorage(false, 'url-execution');