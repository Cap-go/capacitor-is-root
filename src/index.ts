import { registerPlugin } from '@capacitor/core';

import type { IsRootPlugin } from './definitions';

const IsRoot = registerPlugin<IsRootPlugin>('IsRoot', {
  web: () => import('./web').then((m) => new m.IsRootWeb()),
});

export * from './definitions';
export { IsRoot };
