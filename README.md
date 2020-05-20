# @materya/carbon

[![NPM version][npm-image]][npm-url]
[![Dependency Status][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![codecov][codecov-image]][codecov-url]
[![License][license-image]][license-url]

A collection of useful modules with a no-dependency, clean, tested and
lightweight code philosophy.

## Install

```
npm i @materya/carbon
```

## Modules

### `fs`

Module dedicated to explore and manipulate filesystem related operations.

#### `find`

##### `up`

Search a given file `name` in the current directory `cwd` and up the tree until it reaches the top. Will throw if no matching file is found. 

```ts
import * as carbon from '@materya/carbon'

const rcFileName = '.rc.json'

const rcFilePath = carbon.find.up(process.cwd(), rcFileName)
```

#### `crawl`

##### `tree`

Crawl from `directory`, sorting out files and directories in a tree-like object until `depth` is reached.

```ts
import * as carbon from '@materya/carbon'

const tree = carbon.crawl.tree(process.cwd(), 2)

/*
> {
  files: ['filename.ext', 'filename.ext'],
  directories: {
    somedir: {
      files: ['filename.ext', 'filename.ext'],
      directories: {},
    },
    ...
  },
}
*/
```

##### trigger

Crawl from `directory`, triggering `action(name: string, path: string)` callback on each file found. 

```ts
import * as carbon from '@materya/carbon'

const action: FileActionCallback = (name, path) => { /* do something */ }

carbon.crawl.trigger(process.cwd(), action)
```

### `env`

Module dedicated to manage `process.env` and access environment variables.

#### `get`

Get a given `name` env variable. Will throw unless a `defaultValue` is provided.

```ts
import * as carbon from '@materya/carbon'

const myEnv = carbon.env.get('MY_ENV', 42)
```

## License

[GPL-3.0](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@materya/carbon.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@materya/carbon
[david-image]: https://img.shields.io/david/materya/carbon.svg?style=flat-square
[david-url]: https://david-dm.org/materya/carbon
[snyk-image]: https://snyk.io/test/github/materya/carbon/badge.svg?style=flat-square
[snyk-url]: https://app.snyk.io/test/github/materya/carbon?targetFile=package.json
[codecov-image]: https://img.shields.io/codecov/c/github/materya/carbon/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/materya/carbon
[license-image]: https://img.shields.io/npm/l/@materya/carbon.svg?style=flat-square
[license-url]: LICENSE
