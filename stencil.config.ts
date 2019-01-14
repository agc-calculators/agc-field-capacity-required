import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'agc-field-capacity-required',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  globalStyle: 'src/globals/app.css'
};

