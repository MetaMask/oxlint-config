import { createConfig } from '@metamask/oxlint-config';

import commonjs from './src/index.js';

export default createConfig({
  extends: [commonjs],
});
