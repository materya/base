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

##### `list`

Crawl from `directory`, listing all files sorted until `depth` is reached.

```ts
import * as carbon from '@materya/carbon'

const list = carbon.crawl.list(process.cwd(), 2)

/*
> list
[
  'filename1.ext',
  'filename2.ext',
  'dir1/filename1.ext',
  'dir1/filename2.ext',
  'dir1/dir2/filename1.ext',
]
*/
```
##### `tree`

Crawl from `directory`, sorting out files and directories in a tree-like object until `depth` is reached.

```ts
import * as carbon from '@materya/carbon'

const tree = carbon.crawl.tree(process.cwd(), 2)

/*
> tree
{
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

### `tools`

Various utilities method to make life easier.

#### `merge`

Merge together nested arrays or maps.

```ts
import * as carbon from '@materya/carbon'

const map1 = {
  animals: {
    cats: {
      types: ['lion', 'tiger'],
      props: {
        run: true,
        eat: true,
        die: true,
      },
    },
  },
}
const map2 = {
  animals: {
    cats: {
      types: ['cheetah'],
      props: {
        fly: false,
        die: false,
      },
    },
  },
  cars: ['audi', 'ford'],
}

const merged = carbon.tools.merge(map1, map2)

/*
> merged
{
  animals: {
    cats: {
      types: ['lion', 'tiger', 'cheetah'],
      props: {
        run: true,
        eat: true,
        die: false,
        fly: false,
      },
    },
    cars: ['audi', 'ford'],
  },
}
*/
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
