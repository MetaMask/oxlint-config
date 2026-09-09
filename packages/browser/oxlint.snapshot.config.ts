import { createConfig } from '@metamask/oxlint-config';

import browser from './src/index.js';

export default createConfig({
  extends: [browser],
});
