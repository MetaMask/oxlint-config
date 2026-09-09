import { createConfig } from '@metamask/oxlint-config';

import typescript from './src/index.js';

export default createConfig({
  extends: [typescript],
});
