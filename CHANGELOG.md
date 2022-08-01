# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.0.0](https://github.com/materya/carbon/compare/v1.15.2...v3.0.0) (2022-08-01)


### ⚠ BREAKING CHANGES

* **types:** widen `ObjectLiteral` match
* **types:** Rename `AssociativeArray` to `ObjectLiteral`

### Features

* **types:** remove `ObjectIndex` ([affa491](https://github.com/materya/carbon/commit/affa4912df0a7a30797844669b1d14a29b79d12e))
* **types:** Rename `AssociativeArray` to `ObjectLiteral` ([644e3f2](https://github.com/materya/carbon/commit/644e3f2eac65cf4c0f65c50e2fb2ebce68fcc1ce))
* **types:** widen `ObjectLiteral` match ([bb93ed0](https://github.com/materya/carbon/commit/bb93ed0c4bfa470a8533ac82ede6e6519f5119df))


### Bug Fixes

* **promise/sequential:** makes array param as readonly ([5c330b9](https://github.com/materya/carbon/commit/5c330b94672132c8eb1632a62eb2b8e456b2c53c))
* **tools:** improve `merge` ([34c1d88](https://github.com/materya/carbon/commit/34c1d88ab102e43fac6d4386da354e21463bd86a))
* **types:** improve `DeepPartial` & `DeepRequired` signature ([a62adae](https://github.com/materya/carbon/commit/a62adae00a2a5fe52320896184177182c62050e0))

## [2.0.0](https://github.com/materya/carbon/compare/v1.15.2...v2.0.0) (2022-07-26)


### ⚠ BREAKING CHANGES

* **types:** widen `ObjectLiteral` match
* **types:** Rename `AssociativeArray` to `ObjectLiteral`

### Features

* **types:** remove `ObjectIndex` ([affa491](https://github.com/materya/carbon/commit/affa4912df0a7a30797844669b1d14a29b79d12e))
* **types:** Rename `AssociativeArray` to `ObjectLiteral` ([644e3f2](https://github.com/materya/carbon/commit/644e3f2eac65cf4c0f65c50e2fb2ebce68fcc1ce))
* **types:** widen `ObjectLiteral` match ([bb93ed0](https://github.com/materya/carbon/commit/bb93ed0c4bfa470a8533ac82ede6e6519f5119df))


### Bug Fixes

* **tools:** improve `merge` ([34c1d88](https://github.com/materya/carbon/commit/34c1d88ab102e43fac6d4386da354e21463bd86a))
* **types:** improve `DeepPartial` & `DeepRequired` signature ([a62adae](https://github.com/materya/carbon/commit/a62adae00a2a5fe52320896184177182c62050e0))

### [1.15.2](https://github.com/materya/carbon/compare/v1.15.1...v1.15.2) (2022-07-26)


### Bug Fixes

* **tools:** `merge` handle partials properly ([03bc93e](https://github.com/materya/carbon/commit/03bc93e54e505fad331e0e6cd1d7b1492d6a0711))

### [1.15.1](https://github.com/materya/carbon/compare/v1.15.0...v1.15.1) (2022-07-25)


### Bug Fixes

* **tools:** `merge` types signature ([836f0e6](https://github.com/materya/carbon/commit/836f0e66b96ff0ce5c4743c76a35e97a07b1472d))

## [1.15.0](https://github.com/materya/carbon/compare/v1.14.1...v1.15.0) (2022-07-25)


### Features

* **tools:** add the `object` helper ([47bf10f](https://github.com/materya/carbon/commit/47bf10f612a40951439aae10eace4cc0f82111ff))
* **types:** add `DeepPartial` and `DeepRequired` ([b8ddb78](https://github.com/materya/carbon/commit/b8ddb7806a46311e7059f30744e9dddf94da71a5))


### Bug Fixes

* **tools:** improve `merge` type and execution ([b062bea](https://github.com/materya/carbon/commit/b062bea8c565b389be1bac7b4e750997f00412ed))

### [1.14.1](https://github.com/materya/carbon/compare/v1.14.0...v1.14.1) (2022-06-21)

## [1.14.0](https://github.com/materya/carbon/compare/v1.13.0...v1.14.0) (2022-06-21)


### Features

* **types:** add `UnionPick` type ([18f4e6a](https://github.com/materya/carbon/commit/18f4e6a77f35c7d5e651ac4955e5973936494e3b))

## [1.13.0](https://github.com/materya/carbon/compare/v1.12.0...v1.13.0) (2022-04-01)


### Features

* **types:** add `Opaque` generic type ([300ccdd](https://github.com/materya/carbon/commit/300ccddbd834f99e47fa35bd2aab6e83feafb5c7))


### Bug Fixes

* **tools/pick:** do not include missing keys ([4edfd2a](https://github.com/materya/carbon/commit/4edfd2ae1ad6474f0fc2d5fa6898805d56075563))

## [1.12.0](https://github.com/materya/carbon/compare/v1.11.2...v1.12.0) (2022-03-04)


### Features

* **tools:** add `pick` method ([e7b0db0](https://github.com/materya/carbon/commit/e7b0db0ce0b974209792042b16600f86644b98a0))

### [1.11.2](https://github.com/materya/carbon/compare/v1.11.1...v1.11.2) (2021-11-04)


### Bug Fixes

* **types:** ensure no `undefined` in `SelectiveRequired<Type, Keys>` ([5d5f0ee](https://github.com/materya/carbon/commit/5d5f0eec3b0f85b93dd74df4442ecfc363e5491e))

### [1.11.1](https://github.com/materya/carbon/compare/v1.11.0...v1.11.1) (2021-11-04)

## [1.11.0](https://github.com/materya/carbon/compare/v1.10.0...v1.11.0) (2021-11-04)


### Features

* **types:** Add `CastIndexSignature<Type>` type ([99c06d2](https://github.com/materya/carbon/commit/99c06d2a3fb7353a2a954b00d116d25e287ec7d9))


### Bug Fixes

* **types:** missing export ([8bc85fa](https://github.com/materya/carbon/commit/8bc85fa422069f8e2793ca4a95de8ce0a4a7558d))

## [1.10.0](https://github.com/materya/carbon/compare/v1.9.3...v1.10.0) (2021-09-30)


### Features

* **types:** Add a set of utility types ([7b688b9](https://github.com/materya/carbon/commit/7b688b9a1022a1596eff4b24924495eef5b8a9bf))


### Bug Fixes

* **devdeps:** upgrade and stick deps versions ([1fb5c6e](https://github.com/materya/carbon/commit/1fb5c6e96c9561c6e627b1a151f2935989a81330))

### [1.9.3](https://github.com/materya/carbon/compare/v1.9.2...v1.9.3) (2021-07-29)


### Bug Fixes

* **deps:** upgrade and vulnerabilities ([907d6c0](https://github.com/materya/carbon/commit/907d6c069492f070e49a1555402d744a7514dec5))

### [1.9.2](https://github.com/materya/carbon/compare/v1.9.1...v1.9.2) (2020-10-29)


### Bug Fixes

* **tools.merge:** improve types ([e314592](https://github.com/materya/carbon/commit/e314592c30f8d69873890b9253623cfb50f33661))

### [1.9.1](https://github.com/materya/carbon/compare/v1.9.0...v1.9.1) (2020-10-20)


### Bug Fixes

* missing `tools` module export ([85a4ed7](https://github.com/materya/carbon/commit/85a4ed7f636194243d5f436e974504e9abccabf1))

## [1.9.0](https://github.com/materya/carbon/compare/v1.8.1...v1.9.0) (2020-10-20)


### Features

* Add tools module ([06a40f3](https://github.com/materya/carbon/commit/06a40f3082044b61907cdd0ef97df987da006920))


### Bug Fixes

* **deps:** upgrade vulnerabilities ([0b575ad](https://github.com/materya/carbon/commit/0b575ad164d5a9a203726c4357425c41c39e4640))

### [1.8.1](https://github.com/materya/carbon/compare/v1.8.0...v1.8.1) (2020-07-02)


### Bug Fixes

* **deps:** upgrade & vulnerabilities ([e0a5667](https://github.com/materya/carbon/commit/e0a5667d43754f26b0b63dd1395496a58aee8ac8))
* transpilation compatibility ([0604252](https://github.com/materya/carbon/commit/0604252dd15db9cafafb8a2770456a0a19e5a2cb))

## [1.8.0](https://github.com/materya/carbon/compare/v1.7.0...v1.8.0) (2020-05-20)


### Features

* add `fs.crawl.list` method ([ff58788](https://github.com/materya/carbon/commit/ff587882be9bb44f943e6fcf98ed9bcc5b44484d))

## [1.7.0](https://github.com/materya/carbon/compare/v1.6.1...v1.7.0) (2020-05-20)


### Features

* methods renaming ([24f9062](https://github.com/materya/carbon/commit/24f906257b1a2a559007935436ea0405019cbad4))


### Bug Fixes

* **export:** fail export on fs module ([c854b39](https://github.com/materya/carbon/commit/c854b39fcf91f74dbaa2feb23701f309be0d1805))

### [1.6.1](https://github.com/materya/carbon/compare/v1.6.0...v1.6.1) (2020-05-20)


### Bug Fixes

* **deps:** vulnerabilities ([62579e5](https://github.com/materya/carbon/commit/62579e5204b4c23b1f154ac88af3028e4da4708d))

## [1.6.0](https://github.com/materya/carbon/compare/v1.5.0...v1.6.0) (2020-05-20)


### Features

* **fs:** add `list` method ([646f531](https://github.com/materya/carbon/commit/646f53173790d76a137db74a04e101a7454c5746))
* **fs/crawl:** handle nicely missing directory ([2254635](https://github.com/materya/carbon/commit/22546352dca21dfc1bc5db0de9f393adaf22f696))

## [1.5.0](https://github.com/materya/carbon/compare/v1.4.0...v1.5.0) (2020-05-08)


### Features

* add `fs.crawl` module ([84c0aa3](https://github.com/materya/carbon/commit/84c0aa37dc1916e65c990a4fdced3e35187902b6))

## [1.4.0](https://github.com/materya/carbon/compare/v1.3.0...v1.4.0) (2020-05-07)


### Features

* **env:** add `defaultValue` param to `get()` ([8b4e585](https://github.com/materya/carbon/commit/8b4e58500156417a4b7f9e1f5940248d4e6fb26a))

## [1.3.0](https://github.com/materya/carbon/compare/v1.2.0...v1.3.0) (2020-05-06)


### Features

* add `env` module ([8657916](https://github.com/materya/carbon/commit/8657916))


### Tests

* move deprectated mocha.opts to .mocharc.js ([7054540](https://github.com/materya/carbon/commit/7054540))



## [1.2.0](https://github.com/materya/carbon/compare/v1.1.1...v1.2.0) (2020-05-04)


### Features

* add promise module ([8c849de](https://github.com/materya/carbon/commit/8c849de))



### [1.1.1](https://github.com/materya/carbon/compare/v1.1.0...v1.1.1) (2020-05-03)


### Bug Fixes

* empty commit to force patch bump ([aa29d72](https://github.com/materya/carbon/commit/aa29d72))



## [1.1.0](https://github.com/materya/carbon/compare/v1.0.0...v1.1.0) (2020-05-03)


### Features

* **errors:** Add errors module to exports ([6f3585c](https://github.com/materya/carbon/commit/6f3585c))



## 1.0.0 (2020-05-02)
