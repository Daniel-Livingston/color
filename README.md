# @daniel-livingston/color

A JavaScript library inspired by [the popular `color` library](https://www.npmjs.com/package/color) and [the `sass:color` module](https://sass-lang.com/documentation/modules/color/). Allows for immutable color conversion and manipulation without the use of any third-party libraries.

## Installation

```bash
npm install @daniel-livingston/color
```

## Usage

```js
import Color from '@daniel-livingston/color';
```

### Constructors

```js
// RGB
const color = Color('white'); // rgb(255, 255, 255)
const color = Color('#ffffff'); // rgb(255, 255, 255)
const color = Color('rgb(255, 255, 255)'); // rgb(255, 255, 255)
const color = Color({ red: 255, green: 255, blue: 255 }); // rgb(255, 255, 255)

// CMYK
const color = Color('cmyk(0%, 0%, 0%, 0%)'); // cmyk(0%, 0%, 0%, 0%)
const color = Color({ cyan: 0, magenta: 0, yellow: 0, key: 0 }); // cmyk(0%, 0%, 0%, 0%)

// HSL
const color = Color('hsl(0, 0%, 100%)'); // hsl(0, 0%, 100%)
const color = Color({ hue: 0, saturation: 0, lightness: 1 }); // hsl(0, 0%, 100%)

// HSV
const color = Color('hsv(0, 0%, 100%)'); // hsv(0, 0%, 100%)
const color = Color({ hue: 0, saturation: 0, value: 1 }); // hsv(0, 0%, 100%)

// HWB
const color = Color('hwb(0, 100%, 0%)'); // hwb(0, 100%, 0%)
const color = Color({ hue: 0, whiteness: 1, blackness: 0 }); // hwb(0, 100%, 0%)
```

### Conversion

Colors in one color space can be converted to any other color space.

#### `cmyk`

```ts
color.cmyk(): Color;
```

Converts a color to the CMYK color space.

#### `hsl`

```ts
color.hsl(): Color;
```

Converts a color to the HSL color space.

#### `hsv`

```ts
color.hsv(): Color;
```

Converts a color to the HSV color space.

#### `hwb`

```ts
color.hwb(): Color;
```

Converts a color to the HWB color space.

#### `rgb`

```ts
color.rgb(): Color;
```

Converts a color to the RGB color space.

### Manipulation

This library includes the base manipulation functions, as inspired by `sass:color`.

#### `adjust`

```ts
color.adjust(options: {
    red?: number; // -255 <= red <= 255
    green?: number; // -255 <= green <= 255
    blue?: number; // -255 <= blue <= 255
} | {
    hue?: number;
    saturation?: number; // -1 <= saturation <= 1
    lightness?: number; // -1 <= lightness <= 1
} | {
    hue?: number;
    whiteness?: number; // -1 <= whiteness <= 1
    blackness?: number; // -1 <= blackness <= 1
}): Color;
```

Increases or decreases one or more properties of a color by fixed amounts. Returns a new color in the same color space as the original color.

```js
color.adjust({ red: 30, green: -255 });
color.adjust({ hue: 360, lightness: -0.5 });
```

#### `change`

```ts
color.change(options: {
    red?: number; // 0 <= red <= 255
    green?: number; // 0 <= green <= 255
    blue?: number; // 0 <= blue <= 255
} | {
    hue?: number;
    saturation?: number; // 0 <= saturation <= 1
    lightness?: number; // 0 <= lightness <= 1
} | {
    hue?: number;
    whiteness?: number; // 0 <= whiteness <= 1
    blackness?: number; // 0 <= blackness <= 1
}): Color;
```

Sets one or more properties of a color to new values. Returns a new color in the same color space as the original color.

```js
color.change({ red: 0, green: 255 });
color.change({ hue: 360, lightness: 0.5 });
```

#### `complement`

```ts
color.complement(): Color;
```

Get the complement of a color. Returns a new color in the same color space as the original color.

#### `grayscale`

```ts
color.grayscale(): Color;
```

Get the gray color with the same lightness as the given color. Returns a new color in the same color space as the original color.

#### `invert`

```ts
color.invert(): Color;
```

Get the inverse of a color. Returns a new color in the same color space as the original color.

#### `mix`

```ts
color.mix(c2: Color, weight: number = 0.5): Color;
```

Returns a color that is a mixture of the original color and a second color.

The weight should be between `0` and `1` inclusive. A smaller weight indicates that more of the original color should be used. A larger weight indicates that more of the input color should be used.

```js
const color = Color('#036');

color.mix(Color('#d2e1dd')); // #698aa2
color.mix(Color('#d2e1dd'), 0.75); // #355f84
```

#### `scale`

```ts
color.scale(options: {
	red?: number;
	green?: number;
	blue?: number;
} | {
	saturation?: number;
	lightness?: number;
} | {
	whiteness?: number;
	blackness?: number;
}): Color;
```

Scales one or more properties of a color.

Each keyword argument must be a number between `-1` and `1` inclusive. This indicates how far the corresponding property must be moved from its original position towards the maximum or the minimum.

```js
const color = Color('#6b717f');

color.scale({ saturation: 0.8, lightness: -0.3 }); // #0f3795
```

### Getters

Many properties and representations of the color are also available.

#### `array`

```ts
color.array: number[];
```

Get an array of the color's values in the current color space.

```js
// RGB
Color('red').array; // [255, 0, 0]
Color('#ff0000').array; // [255, 0, 0]
Color('rgb(255, 0, 0)').array; // [255, 0, 0]

// CMYK
Color('cmyk(100%, 0%, 0%, 50%)').array; // [1, 0, 0, 0.5]

// HSL
Color('hsl(240, 100%, 50%)').array; // [240, 1, 0.5]

// HSV
Color('hsv(240, 100%, 50%)').array; // [240, 1, 0.5]

// HWB
Color('hwb(240, 100%, 50%)').array; // [240, 1, 0.5]
```

#### `blackness`

```ts
color.blackness: number;
```

The HWB blackness and CMYK key of the color as a number between `0` and `1` inclusive.

#### `blue`

```ts
color.blue: number;
```

The blue channel of the color as a number between `0` and `255` inclusive.

#### `cyan`

```ts
color.cyan: number;
```

The CMYK cyan value of the color as a number between `0` and `1` inclusive.

#### `green`

```ts
color.green: number;
```

The green channel of the color as a number between `0` and `255` inclusive.

#### `hex`

```ts
color.hex: string;
```

The hex value of the color.

```js
Color('red').hex; // #ff0000
```

#### `hue`

```ts
color.hue: number;
```

The hue of the color as a number between `0` and `360` inclusive.

#### `lightness`

```ts
color.lightness: number;
```

The HSL lightness of a color as a number between `0` and `1` inclusive.

#### `magenta`

```ts
color.magenta: number;
```

The CMYK magenta value of a color as a number between `0` and `1` inclusive.

#### `object`

```ts
color.object: { [key: string]: number };
```

Get an object representation of the color's values in the current color space.

```js
// RGB
Color('red').object; // { red: 255, green: 0; blue: 0 }
Color('#ff0000').object; // { red: 255, green: 0; blue: 0 }
Color('rgb(255, 0, 0)').object; // { red: 255, green: 0; blue: 0 }

// CMYK
Color('cmyk(100%, 0%, 0%, 50%)').object; // { cyan: 1, magenta: 0, yellow: 0, key: 0.5 }

// HSL
Color('hsl(240, 100%, 50%)').object; // { hue: 240, saturation: 1, lightness: 0.5 }

// HSV
Color('hsv(240, 100%, 50%)').object; // { hue: 240, saturation: 1, value: 0.5 }

// HWB
Color('hwb(240, 100%, 50%)').object; // { hue: 240, whiteness: 1, blackness: 0.5 }
```

#### `red`

```ts
color.red: number;
```

The red channel of a color as a number between `0` and `255` inclusive.

#### `saturation`

```ts
color.saturation: number;
```

The saturation of a color as a number between `0` and `1` inclusive.

#### `string`

```ts
color.string: string;
```

Get a string representation of the color's values in the current color space.

```js
// RGB
Color('red').string; // rgb(255, 0, 0)
Color('#ff0000').string; // rgb(255, 0, 0)
Color('rgb(255, 0, 0)').string; // rgb(255, 0, 0)

// CMYK
Color('cmyk(100%, 0%, 0%, 50%)').string; // cmyk(100%, 0%, 0%, 50%)

// HSL
Color('hsl(240, 100%, 50%)').string; // hsl(240, 100%, 50%)

// HSV
Color('hsv(240, 100%, 50%)').string; // hsv(240, 100%, 50%)

// HWB
Color('hwb(240, 100%, 50%)').string; // hwb(240, 100%, 50%)
```

#### `whiteness`

```ts
color.whiteness: number;
```

The HWB whiteness of a color as a number between `0` and `1` inclusive.

#### `yellow`

```ts
color.yellow: number;
```

The CMYK yellow value of a color as a number between `0` and `1` inclusive.
