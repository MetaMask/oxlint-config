import base, { createConfig } from '@metamask/oxlint-config';
import nodejs from '@metamask/oxlint-config-nodejs';
import typescript from '@metamask/oxlint-config-typescript';
import vitest from '@metamask/oxlint-config-vitest';

export default createConfig({
  ignorePatterns: ['.yarn'],
  extends: [base, nodejs, typescript, vitest],
});
