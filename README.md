
# Commit Lint for Danger.js

[![CircleCI](https://circleci.com/gh/BenLorantfy/danger-plugin-duplicate-packages/tree/master.svg?style=svg)](https://circleci.com/gh/BenLorantfy/danger-plugin-duplicate-packages/tree/master)

This is a [Danger Plugin][danger] that ensures nice and tidy commit messages. The checks performed on each commit message are inspired by [Tim Pope's blog post][tpope] on good commit messages, echoed by [git's own documentation][book] on the subject. This is almost a direct typescript port of the ruby version, which you can find [here][ruby_version]. Thanks to [@jonallured][jonallured] for creating the ruby version.

[jonallured]: https://github.com/jonallured
[ruby_version]: https://github.com/jonallured/danger-commit_lint
[danger]: https://github.com/danger/danger-js
[tpope]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
[book]: https://www.git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project#Commit-Guidelines

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
