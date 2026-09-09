import { createConfig } from '@metamask/oxlint-config';

import vitest from './src/index.js';

export default createConfig({
  extends: [vitest],
});
