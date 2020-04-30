# @materya/base

[![NPM version][npm-image]][npm-url]
[![Dependency Status][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![codecov][codecov-image]][codecov-url]
[![License][license-image]][license-url]

A collection of useful modules with a no-dependency, clean, tested and
lightweight code philosophy.

## Install

```
npm i @materya/base
```

## Modules

### `fs`

Module dedicated to explore and manipulate filesystem related operations.

#### `find`

| name | params | returns | description |
|-|-|-|-|
| `up` | `cwd`, `name` | file's full path | search a given file `name` in the current directory `cwd` and up the tree until it reaches the top. |

## License

[GPL-3.0](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@materya/base.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@materya/base
[david-image]: https://img.shields.io/david/materya/base.svg?style=flat-square
[david-url]: https://david-dm.org/materya/base
[snyk-image]: https://snyk.io/test/github/materya/base/badge.svg?style=flat-square
[snyk-url]: https://app.snyk.io/test/github/materya/base?targetFile=package.json
[codecov-image]: https://img.shields.io/codecov/c/github/materya/base/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/materya/base
[license-image]: https://img.shields.io/npm/l/@materya/base.svg?style=flat-square
[license-url]: LICENSE
