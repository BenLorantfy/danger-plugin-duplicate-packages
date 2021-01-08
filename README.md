
# danger-plugin-duplicate-packages

This danger plugin can be used to check for duplicates of specific packages and throw a failure if it finds any.  This has a few different use cases, such as fighting bundle size, or [ensuring only one copy react is loaded at a time](https://reactjs.org/warnings/refs-must-have-owner.html#multiple-copies-of-react).

## Installation

```sh
yarn add danger-plugin-duplicate-packages -D
```

## Usage

Simply add this to your Dangerfile:

```typescript
import { checkDuplicatePackages } from 'danger-plugin-duplicate-packages'

checkDuplicatePackages({
  packageNames: ["react-native"]
})
```

And `checkDuplicatePackages` will output an error if it finds multiple copies of `react-native`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
