import { createConfig } from '@metamask/oxlint-config';

import nodejs from './src/index.js';

export default createConfig({
  extends: [nodejs],
});
