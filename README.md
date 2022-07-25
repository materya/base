# @materya/carbon

[![NPM version][npm-image]][npm-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![tests][tests-image]][tests-url]
[![codecov][codecov-image]][codecov-url]
[![License][license-image]][license-url]

A collection of useful modules with a no-dependency, clean, tested and
lightweight code philosophy.

## Install

```
npm i @materya/carbon
```

## TOC

- [Modules](#modules)
  - [fs](#fs)
  - [env](#env)
  - [tools](#tools)
- [Types](#types)


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

##### `trigger`

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

Various utility methods to make life easier.

#### `object`

##### `isObject`

Based on numerous threads and propositions across the internet (mainly SO), this method aims
to identify with the best accuracy and the least complexity if a given value is an "object"
(ie. an associative array).

See all tests at [./test/tools/object.test.ts]()

```ts
import { tools } from '@materya/carbon'

tools.object.isObject({}) // true
tools.object.isObject([]) // false
tools.object.isObject(() => null) // false
tools.object.isObject((new Date())) // false
// ...
```

#### `merge`

Deep merge together nested arrays or maps.

**NOTE**: The later sources keys take precedence over the previous same ones if a "conflict" arise.

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
    cars: ['dodge', 'ford'],
  },
}
const map2 = {
  animals: {
    cats: {
      types: ['cheetah'],
      props: {
        fly: false,
        die: false, // it is well known that cats have 9 lives and don't die.
      },
    },
  },
  cars: ['audi', 'bmw'],
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
    cars: ['dodge', 'ford', 'audi', 'bmw'],
  },
}
*/
```

#### `pick`

Extract specific keys from a given object and return a new one with only those keys.

```ts
import * as carbon from '@materya/carbon'

const obj = {
  a: 'foo',
  b: 42,
  c: 'bar',
  d: { obj: 'foobar' },
}

const partialObj = carbon.tools.pick(obj)('b', 'd')

/*
> partialObj
{
  b: 42,
  d: { obj: 'foobar' },
}
*/
```

## Types

Carbon provides also a set of utility types.

### `AssociativeArray`

Since the standard type `object` is hard to use and error prone, this general type aims to replace it.

See https://github.com/microsoft/TypeScript/issues/21732 for more details.

```ts
type AssociativeArray = Record<keyof any, unknown>
```

### `CastIndexSignature<Type>`

Workaround to fix an index signature issue with interfaces.

See https://github.com/microsoft/TypeScript/issues/15300 for more details.

```ts
interface Todo {
  title: string;
  description?: string;
  completed: boolean;
}

type TypeWithGenericObject<T extends Record<string | number | symbol, unknown>> = T

let test1: TypeWithGenericObject<Todo> // Throw a ts(2344) error
let test2: TypeWithGenericObject<CastIndexSignature<Todo>> // Works
```

### `DeepPartial<Type>`

Traverse a `Type` extending an object to switch all the props as optionals, recursively.

```ts
interface Todo {
  title: string;
  description: string;
  metadata: {
    foo: {
      bar: {
        ber: string;
      };
    };
  };
  completed: boolean;
}

type DeepPartialTodo: DeepPartial<Todo>
// type DeepPartialTodo = {
//   title?: string;
//   description?: string;
//   metadata?: {
//     foo?: {
//       bar?: {
//         ber?: string;
//       };
//     };
//   };
```

### `DeepRequired<Type>`

Traverse a `Type` extending an object to switch all the props as required, recursively.

```ts
interface Todo {
  title?: string;
  description?: string;
  metadata?: {
    foo?: {
      bar?: {
        ber?: string;
      };
    };
  };
  completed?: boolean;
}

type DeepRequiredTodo: DeepRequired<Todo>
// type DeepRequiredTodo = {
//   title: string;
//   description: string;
//   metadata: {
//     foo: {
//       bar: {
//         ber: string;
//       };
//     };
//   };
```

### `Opaque<Alias, Type>`

Type alias that makes a given standard `Type` like `string` unique by its `Alias` name.  
Similar and inspired by Flow https://flow.org/en/docs/types/opaque-types/

```ts
type UniqueString = Opaque<'UniqueString', string>

const uniqueString: UniqueString = 'foobar'
const nonUniqueString = 'foobar'

const f = (arg: UniqueString): UniqueString => arg

f(nonUniqueString) // ts(2345) error: Argument of type 'string' is not assignable to parameter of type 'UniqueString'
f(uniqueString) // Valid

const f2 = (arg: string): string => arg

f2(nonUniqueString) // Valid
f2(uniqueString) // Valid, still a string
```

### `OptionalProps<Type>`

Constructs a set of properties type by extracting all the optional keys from `Type`.

```ts
type Todo = {
  title: string;
  description?: string;
  completed: boolean;
}

type TodoOptionalProps = OptionalProps<Todo>

// type TodoOptionalProps = "description"
```

### `RequiredProps<Type>`

Constructs a set of properties type by extracting all the required keys from `Type`.

```ts
type Todo = {
  title: string;
  description?: string;
  completed: boolean;
}

type TodoRequiredProps = RequiredProps<Todo>

// type TodoRequiredProps = "title" | "completed"
```

### `SelectivePartial<Type, Keys>`

Constructs a type by picking all properties from `Type` and then switching `Keys` as optionals.


```ts
type Todo = {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
  assignee: string;
}

type PartialTodo = SelectivePartial<Todo, 'createdAt' | 'assignee'>

// type PartialTodo = {
//   title: string; // Stays required
//   description?: string;
//   completed: boolean; // Stays required
//   createdAt?: number;
//   assignee?: string;
// }
```

### `SelectiveRequired<Type, Keys>`

Constructs a type by picking all properties from `Type` and then switching `Keys` as required.


```ts
type Todo = {
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
  assignee?: string;
  reviewer?: string;
}

type RequiredTodo = SelectiveRequired<Todo, 'assignee' | 'reviewer'>

// type RequiredTodo = {
//   title: string;
//   description?: string; // Stays optional
//   completed: boolean;
//   createdAt: number;
//   assignee: string;
//   reviewer: string;
// }
```

### `UnionPick<Type, Values>`

Constructs a new type as a valid subset of a given union `Type` by picking up all given `Values` from it.

```ts
type FooBarBaz =
  | 'foo'
  | 'bar'
  | 'baz'

// Valid Type
type FooBar = UnionPick<FooBarBaz, 'foo' | 'bar'>

// Invalid Type
type FooBer = UnionPick<FooBarBaz, 'foo' | 'ber'>
//                                 ^^^^^^^^^^^^^
// Type '"foo" | "ber"' does not satisfy the constraint 'FooBarBaz'.
//   Type '"ber"' is not assignable to type 'FooBarBaz'.ts(2344)
```

## License

[GPL-3.0](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@materya/carbon.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@materya/carbon
[snyk-image]: https://snyk.io/test/github/materya/carbon/badge.svg?style=flat-square
[snyk-url]: https://app.snyk.io/test/github/materya/carbon?targetFile=package.json
[codecov-image]: https://img.shields.io/codecov/c/github/materya/carbon/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/materya/carbon
[tests-image]: https://img.shields.io/github/workflow/status/materya/carbon/Tests?logo=github&style=flat-square
[tests-url]: https://github.com/materya/carbon/actions/workflows/test.yml
[license-image]: https://img.shields.io/github/license/materya/carbon?style=flat-square
[license-url]: LICENSE
