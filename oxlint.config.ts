import base, { createConfig } from '@metamask/oxlint-config';
import typescript from '@metamask/oxlint-config-typescript';

export default createConfig({
  ignorePatterns: ['.yarn'],
  extends: [base, typescript],
});
