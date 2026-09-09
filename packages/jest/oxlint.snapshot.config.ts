import { createConfig } from '@metamask/oxlint-config';

import jest from './src/index.js';

export default createConfig({
  extends: [jest],
});
