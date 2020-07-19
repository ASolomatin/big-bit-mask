[npm-icon]:             https://img.shields.io/npm/v/big-bit-mask.svg
[npm-downloads-icon]:   https://img.shields.io/npm/dt/big-bit-mask.svg
[npm-url]:              https://www.npmjs.com/package/big-bit-mask

[test-icon]:            https://travis-ci.com/ASolomatin/big-bit-mask.svg?branch=master
[test-url]:             https://travis-ci.com/github/ASolomatin/big-bit-mask

[coverage-icon]:        https://coveralls.io/repos/github/ASolomatin/big-bit-mask/badge.svg?branch=master
[coverage-url]:         https://coveralls.io/github/ASolomatin/big-bit-mask?branch=master

[packaging-icon]:       https://github.com/ASolomatin/big-bit-mask/workflows/Node.js%20Package/badge.svg
[packaging-url]:        https://github.com/ASolomatin/big-bit-mask/actions?query=workflow%3A%22Node.js+Package%22

[license-icon]:         https://img.shields.io/github/license/ASolomatin/big-bit-mask
[license-url]:          https://github.com/ASolomatin/big-bit-mask/blob/master/LICENSE

# Big bit mask

[![NPM][npm-icon]][npm-url]
[![NPM downloads][npm-downloads-icon]][npm-url]
[![Travis-CI][test-icon]][test-url]
[![Coverage Status][coverage-icon]][coverage-url]
[![Node.js Package][packaging-icon]][packaging-url]
[![GitHub][license-icon]][license-url]

----------------------------------------

When bits is not enough ...

This library implements a bitmask serializable into a base64-like, url-safe string.

## Other platform compatibility

| Platform | Repository | Package |
|-|-|-|
| PHP | [php-big-bit-mask](https://github.com/ASolomatin/php-big-bit-mask) | [Packagist](https://packagist.org/packages/asolomatin/php-big-bit-mask) |
| .NET | [BigBitMask.NET](https://github.com/ASolomatin/BigBitMask.NET) | [NuGet](https://www.nuget.org/packages/BigBitMask.NET/) |

## Install
```
> npm install big-bit-mask
```
or
```
> yarn add big-bit-mask
```
## Usage

### Module import
```js
import { BigBitMask } from "big-bit-mask";
```

Or require:
```js
var BigBitMask = require("big-bit-mask").BigBitMask;
```

Or simple script without anything else:
```html
<html>
    <head>
        <script src="./node_modules/big-bit-mask/dist/big-bit-mask.es5.min.js"></script>
    </head>
    <body>
        <script>
            var BigBitMask = BIGBITMASK.BigBitMask;
        </script>
    </body>
</html>
```

### What next?

Now we can create new empty bitmask
```js
var bitmask = new BigBitMask();
```
or load it from string
```js
var bitmask = new BigBitMask("CE3fG_gE-56");

//Let's see what inside now
var content = "";
for(var i = 0; i < 11 * 6; i++) { // Each character contains 6 bits, as in base64
    content += bitmask.get(i) ? "1" : "0";
}
console.info(content);
```
output: `010000001000111011111110011000111111000001001000011111100111010111`

Then we can change some bits and get back our string representation
```js
bitmask.set(65, false);
bitmask.set(64, false);
bitmask.set(63, false);
bitmask.set(61, false);

bitmask.set(19, false);
bitmask.set(5, true);

console.info(bitmask.toString());
```
output: `iE3dG_gE-5`

#### But what if I want to have a named flags?

You can extend BigBitMask with your model:
```js
class MyCoolCheckboxes extends BigBitMask {
    static get CHECKBOX_0() { return 0; }
    static get CHECKBOX_1() { return 1; }
    static get CHECKBOX_2() { return 2; }
    static get CHECKBOX_3() { return 3; }
    static get CHECKBOX_4() { return 4; }
    static get CHECKBOX_5() { return 5; }
    static get CHECKBOX_6() { return 6; }
    static get CHECKBOX_7() { return 7; }
    static get CHECKBOX_8() { return 8; }
    static get CHECKBOX_9() { return 9; }

    get checkbox0() { return this.get(MyCoolCheckboxes.CHECKBOX_0); }
    set checkbox0(value) { return this.set(MyCoolCheckboxes.CHECKBOX_0, value); }

    get checkbox1() { return this.get(MyCoolCheckboxes.CHECKBOX_1); }
    set checkbox1(value) { return this.set(MyCoolCheckboxes.CHECKBOX_1, value); }

    get checkbox2() { return this.get(MyCoolCheckboxes.CHECKBOX_2); }
    set checkbox2(value) { return this.set(MyCoolCheckboxes.CHECKBOX_2, value); }

    get checkbox3() { return this.get(MyCoolCheckboxes.CHECKBOX_3); }
    set checkbox3(value) { return this.set(MyCoolCheckboxes.CHECKBOX_3, value); }

    get checkbox4() { return this.get(MyCoolCheckboxes.CHECKBOX_4); }
    set checkbox4(value) { return this.set(MyCoolCheckboxes.CHECKBOX_4, value); }

    get checkbox5() { return this.get(MyCoolCheckboxes.CHECKBOX_5); }
    set checkbox5(value) { return this.set(MyCoolCheckboxes.CHECKBOX_5, value); }

    get checkbox6() { return this.get(MyCoolCheckboxes.CHECKBOX_6); }
    set checkbox6(value) { return this.set(MyCoolCheckboxes.CHECKBOX_6, value); }

    get checkbox7() { return this.get(MyCoolCheckboxes.CHECKBOX_7); }
    set checkbox7(value) { return this.set(MyCoolCheckboxes.CHECKBOX_7, value); }

    get checkbox8() { return this.get(MyCoolCheckboxes.CHECKBOX_8); }
    set checkbox8(value) { return this.set(MyCoolCheckboxes.CHECKBOX_8, value); }

    get checkbox9() { return this.get(MyCoolCheckboxes.CHECKBOX_9); }
    set checkbox9(value) { return this.set(MyCoolCheckboxes.CHECKBOX_9, value); }
}

var checkboxes = new MyCoolCheckboxes();
checkboxes.checkbox5 = true;
checkboxes.checkbox7 = true;
checkboxes.checkbox8 = true;

console.info(checkboxes.toString());
```
output: `gG`

Or with TypeScript:
```ts
class MyCoolCheckboxes extends BigBitMask {
    public static readonly CHECKBOX_0 = 0;
    public static readonly CHECKBOX_1 = 1;
    public static readonly CHECKBOX_2 = 2;

    public get checkbox0(): boolean { return this.get(MyCoolCheckboxes.CHECKBOX_0); }
    public set checkbox0(value: boolean) { this.set(MyCoolCheckboxes.CHECKBOX_0, value); }

    public get checkbox1(): boolean { return this.get(MyCoolCheckboxes.CHECKBOX_1); }
    public set checkbox1(value: boolean) { this.set(MyCoolCheckboxes.CHECKBOX_1, value); }

    public get checkbox2(): boolean { return this.get(MyCoolCheckboxes.CHECKBOX_2); }
    public set checkbox2(value: boolean) { this.set(MyCoolCheckboxes.CHECKBOX_2, value); }
}
```
----------------------------------------

## License

**[MIT][license-url]**

Copyright (C) 2020 Aleksej Solomatin









