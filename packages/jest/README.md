# `@metamask/oxlint-config-jest`

MetaMask's [Jest](https://jestjs.io/) Oxlint configuration.

## Usage

```bash
yarn add --dev \
    @metamask/oxlint-config@^0.0.0 \
    @metamask/oxlint-config-jest@^0.0.0 \
    oxlint@^1.82.0
```

The order in which you extend ESLint rules matters.
The `@metamask/*` Oxlint configs should be added to the config array _last_,
with `@metamask/oxlint-config` first, and `@metamask/oxlint-config-*` in any
order thereafter.

```js
import base, { createConfig } from '@metamask/oxlint-config';
import jest from '@metamask/oxlint-config-jest';

const config = createConfig({
  extends: [
    // Any custom shared config should be added here.
    // ...

    // This should be added last unless you know what you're doing.
    base,
    jest,
  ],
});
```
