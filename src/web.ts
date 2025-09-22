import { WebPlugin } from '@capacitor/core';

import type { IsRootPlugin } from './definitions';

export class IsRootWeb extends WebPlugin implements IsRootPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
