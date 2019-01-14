
// AgcFieldCapacityRequired: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './agc-field-capacity-required.core.js';
import {
  AgcFieldCapacityRequired,
  AgcFieldCapacityRequiredInputs,
  AgcFieldCapacityRequiredProgress,
  AgcFieldCapacityRequiredResults,
  AgcFieldCapacityRequiredResultsPlaceholder
} from './agc-field-capacity-required.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    AgcFieldCapacityRequired,
    AgcFieldCapacityRequiredInputs,
    AgcFieldCapacityRequiredProgress,
    AgcFieldCapacityRequiredResults,
    AgcFieldCapacityRequiredResultsPlaceholder
  ], opts);
}
