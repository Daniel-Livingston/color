import HSL from './hsl';
import HWB from './hwb';
import RGB from './rgb';
import type {
	AdjustableColorValues,
	AdjustableHSLValues,
	AdjustableHWBValues,
	AdjustableRGBValues,
	ColorParam,
	ColorSpace,
	ScalableColorValues,
	ScalableHSLValues,
	ScalableHWBValues,
	ScalableRGBValues
} from './types';

/**
 * A color within a specific color space.
 */
export default abstract class Color {
	protected _space: ColorSpace = 'rgb';
	protected _c: number | null = null;
	protected _m: number | null = null;
	protected _y: number | null = null;
	protected _k: number | null = null;
	protected _h: number | null = null;
	protected _s: number | null = null;
	protected _l: number | null = null;
	protected _v: number | null = null;
	protected _w: number | null = null;
	protected _r: number | null = null;
	protected _g: number | null = null;
	protected _b: number | null = null;
	protected _hex: string | null = null;

	/**
	 * An object representing a color or an equivalent string representation.
	 *
	 * e.g., `new Color('#000')`, `new Color({r: 0, g: 0, b: 0})`, and `new Color('rgb(0, 0, 0)')` are equivalent.
	 *
	 * @param param A color or a string representation of a color.
	 */
	constructor(param: ColorParam) {}

	/**
	 * The array form of a color in the current color space.
	 *
	 * e.g., `color('#000').cmyk().array` returns `[0, 0, 0, 1]`.
	 *
	 * @readonly
	 */
	abstract get array(): number[];

	/**
	 * Convert a color to the CMYK color space.
	 */
	abstract cmyk(): Color;

	/**
	 * Convert a color to the HSL color space.
	 */
	abstract hsl(): Color;

	/**
	 * Convert a color to the HSV color space.
	 */
	abstract hsv(): Color;

	/**
	 * Convert a color to the HWB color space.
	 */
	abstract hwb(): Color;

	/**
	 * The object form of a color in the current color space.
	 *
	 * e.g., `color('#000').cmyk().object` returns `{ c: 0, m: 0, y: 0, k: 1 }`.
	 *
	 * @readonly
	 */
	abstract get object(): { [key: string]: number };

	/**
	 * Convert a color to the RGB color space.
	 */
	abstract rgb(): Color;

	/**
	 * The string form of a color in the current color space.
	 *
	 * e.g., `color('#000').cmyk().string` returns `cmyk(0, 0, 0, 1)`.
	 *
	 * @readonly
	 */
	abstract get string(): string;

	/**
	 * Get the CMYK values for the color.
	 */
	protected abstract _cmyk(): [number, number, number, number];

	/**
	 * Get the HSL values for the color.
	 */
	protected abstract _hsl(): [number, number, number];

	/**
	 * Get the HSV values for the color.
	 */
	protected abstract _hsv(): [number, number, number];

	/**
	 * Get the HWB values for the color.
	 */
	protected abstract _hwb(): [number, number, number];

	/**
	 * Parse a color string.
	 */
	protected abstract _parse(color: string): void;

	/**
	 * Get the RGB values for the color.
	 */
	protected abstract _rgb(): [number, number, number];

	/**
	 * Increase or decrease one or more properties of a color by fixed amounts.
	 *
	 * Must only specify changes in one color space at a time. (e.g., `adjust({red: 10, hue: 260})` is invalid.).
	 */
	adjust(options: AdjustableColorValues): Color {
		if ('red' in options || 'green' in options || 'blue' in options) {
			const newValues = this._adjustRgb(options);
			return new RGB(newValues)[this._space]();
		}

		if ('whiteness' in options || 'blackness' in options) {
			const newValues = this._adjustHwb(options);
			return new HWB(newValues)[this._space]();
		}

		if ('hue' in options || 'saturation' in options || 'lightness' in options) {
			const newValues = this._adjustHsl(options);
			return new HSL(newValues)[this._space]();
		}

		return this;
	}

	/**
	 * The blackness value for the color.
	 *
	 * @readonly
	 */
	get blackness(): number {
		if (this._k === null) {
			[this._h, this._w, this._k] = this._hwb();
		}

		return Math.round(this._k * 100) / 100;
	}

	/**
	 * The blue value for the color.
	 *
	 * @readonly
	 */
	get blue(): number {
		if (this._b === null) {
			[this._r, this._g, this._b] = this._rgb();
		}

		return Math.round(this._b);
	}

	/**
	 * The brightness value for the color.
	 *
	 * @readonly
	 */
	get brightness(): number {
		if (this._v === null) {
			[this._h, this._s, this._v] = this._hsv();
		}

		return Math.round(this._v * 100) / 100;
	}

	change(options: Partial<AdjustableColorValues>): Color {
		if ('red' in options || 'green' in options || 'blue' in options) {
			const newValues = this._changeRgb(options);
			return new RGB(newValues)[this._space]();
		}

		if ('whiteness' in options || 'blackness' in options) {
			const newValues = this._changeHwb(options);
			return new HWB(newValues)[this._space]();
		}

		if ('hue' in options || 'saturation' in options || 'lightness' in options) {
			const newValues = this._changeHsl(options);
			return new HSL(newValues)[this._space]();
		}

		return this;
	}

	/**
	 * The cyan value for the color.
	 *
	 * @readonly
	 */
	get cyan(): number {
		if (this._c === null) {
			[this._c, this._m, this._y, this._k] = this._cmyk();
		}

		return Math.round(this._c * 100) / 100;
	}

	/**
	 * Returns the complement of this color.
	 */
	complement(): Color {
		return this.adjust({ hue: 180 });
	}

	/**
	 * Returns the gray color with the same lightness as this color.
	 */
	grayscale(): Color {
		return this.change({ saturation: 0 });
	}

	/**
	 * The green value for the color.
	 *
	 * @readonly
	 */
	get green(): number {
		if (this._g === null) {
			[this._r, this._g, this._b] = this._rgb();
		}

		return Math.round(this._g);
	}

	/**
	 * The hex value for the color.
	 *
	 * @readonly
	 */
	get hex(): string {
		if (this._hex === null) {
			this._hex = `#${this.red.toString(16).padStart(2, '0')}${this.green
				.toString(16)
				.padStart(2, '0')}${this.blue.toString(16).padStart(2, '0')}`;
		}

		return this._hex;
	}

	/**
	 * The hue value for the color.
	 *
	 * @readonly
	 */
	get hue(): number {
		if (this._h === null) {
			[this._h, this._s, this._l] = this._hsl();
		}

		return Math.round(this._h);
	}

	/**
	 * Returns the inverse of this color in the RGB color space.
	 */
	invert(): Color {
		return this.change({
			red: 255 - this.red,
			green: 255 - this.green,
			blue: 255 - this.blue
		});
	}

	/**
	 * The lightness value for the color.
	 *
	 * @readonly
	 */
	get lightness(): number {
		if (this._l === null) {
			[this._h, this._s, this._l] = this._hsl();
		}

		return Math.round(this._l * 100) / 100;
	}

	/**
	 * The magenta value for the color.
	 *
	 * @readonly
	 */
	get magenta(): number {
		if (this._m === null) {
			[this._c, this._m, this._y, this._k] = this._cmyk();
		}

		return Math.round(this._m * 100) / 100;
	}

	/**
	 * Returns a color that is a mixture of this color and the given color.
	 *
	 * The weight determines how much of each color to use. A larger weight means more of the given color is used.
	 *
	 * @param color The color to mix with.
	 * @param weight The weight of the color to mix with. Defaults to 0.5.
	 * @returns
	 */
	mix(color: Color, weight: number = 0.5): Color {
		const r0 = this.red;
		const r1 = color.red;

		const g0 = this.green;
		const g1 = color.green;

		const b0 = this.blue;
		const b1 = color.blue;

		const r = r0 * weight + r1 * (1 - weight);
		const g = g0 * weight + g1 * (1 - weight);
		const b = b0 * weight + b1 * (1 - weight);

		return new RGB({ red: r, green: g, blue: b })[this._space]();
	}

	/**
	 * The red value for the color.
	 *
	 * @readonly
	 */
	get red(): number {
		if (this._r === null) {
			[this._r, this._g, this._b] = this._rgb();
		}

		return Math.round(this._r);
	}

	/**
	 * The saturation value for the color.
	 *
	 * @readonly
	 */
	get saturation(): number {
		if (this._s === null) {
			[this._h, this._s, this._l] = this._hsl();
		}

		return Math.round(this._s * 100) / 100;
	}

	/**
	 *
	 * @param weight
	 * @returns
	 */
	scale(options: Partial<ScalableColorValues>): Color {
		if ('red' in options || 'green' in options || 'blue' in options) {
			const newValues = this._scaleRgb(options);
			return new RGB(newValues)[this._space]();
		}

		if ('whiteness' in options || 'blackness' in options) {
			const newValues = this._scaleHwb(options);
			return new HWB(newValues)[this._space]();
		}

		if ('saturation' in options || 'lightness' in options) {
			const newValues = this._scaleHsl(options);
			return new HSL(newValues)[this._space]();
		}

		return this;
	}

	/**
	 * The whiteness value for the color.
	 *
	 * @readonly
	 */
	get whiteness(): number {
		if (this._w === null) {
			[this._h, this._w, this._k] = this._hwb();
		}

		return Math.round(this._w * 100) / 100;
	}

	/**
	 * The yellow value for the color.
	 *
	 * @readonly
	 */
	get yellow(): number {
		if (this._y === null) {
			[this._c, this._m, this._y, this._k] = this._cmyk();
		}

		return Math.round(this._y * 100) / 100;
	}

	/** A helper function to convert HSV values to RGB values. */
	protected static _hsvToRgb(h: number, s: number, v: number): [number, number, number] {
		h /= 360;

		const i = Math.floor(h * 6);
		const f = h * 6 - i;
		const p = v * (1 - s);
		const q = v * (1 - f * s);
		const t = v * (1 - (1 - f) * s);

		let r, g, b;
		switch (i % 6) {
			case 0:
				r = v;
				g = t;
				b = p;
				break;
			case 1:
				r = q;
				g = v;
				b = p;
				break;
			case 2:
				r = p;
				g = v;
				b = t;
				break;
			case 3:
				r = p;
				g = q;
				b = v;
				break;
			case 4:
				r = t;
				g = p;
				b = v;
				break;
			case 5:
				r = v;
				g = p;
				b = q;
				break;
			default:
				throw new Error(
					'Something went wrong when converting from HSV to RGB. Input was ' + [h, s, v].join(', ')
				);
		}

		return [r * 255, g * 255, b * 255];
	}

	/** A helper function to convert RGB values to CMYK values. */
	protected static _rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
		r = r / 255;
		g = g / 255;
		b = b / 255;

		const k = 1 - Math.max(r, g, b);

		if (k === 1) {
			return [0, 0, 0, 1];
		}

		const c = (1 - r - k) / (1 - k);
		const m = (1 - g - k) / (1 - k);
		const y = (1 - b - k) / (1 - k);

		return [c, m, y, k];
	}

	/** A helper function to convert RGB values to HSL values. */
	protected static _rgbToHsl(r: number, g: number, b: number): [number, number, number] {
		r /= 255;
		g /= 255;
		b /= 255;

		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);

		const l = (max + min) / 2;

		if (max === min) {
			return [0, 0, l];
		}

		const s = l <= 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);

		let h = 0;
		if (max === r) {
			h = (g - b) / (max - min);
		} else if (max === g) {
			h = 2 + (b - r) / (max - min);
		} else {
			h = 4 + (r - g) / (max - min);
		}

		h = h * 60;
		if (h < 0) {
			h += 360;
		}

		return [h, s, l];
	}

	/** A helper function to convert RGB values to HSV values. */
	protected static _rgbToHsv(r: number, g: number, b: number): [number, number, number] {
		const [h, s, l] = Color._rgbToHsl(r, g, b);
		const v = l + s * Math.min(l, 1 - l);
		const s2 = v === 0 ? 0 : 2 - (2 * l) / v;

		return [h, s2, v];
	}

	/** A helper function to convert RGB values to HWB values. */
	protected static _rgbToHwb(r: number, g: number, b: number): [number, number, number] {
		const [h] = Color._rgbToHsl(r, g, b);

		r /= 255;
		g /= 255;
		b /= 255;

		const w = Math.min(r, g, b);
		const b2 = 1 - Math.max(r, g, b);

		return [h, w, b2];
	}

	/** A helper function to get the adjusted HSL values. */
	private _adjustHsl({ hue = 0, saturation = 0, lightness = 0 }: AdjustableHSLValues = {}) {
		const values = {
			hue: this.hue,
			saturation: this.saturation,
			lightness: this.lightness
		};

		if (hue) {
			values.hue = hue > 0 ? (this.hue + hue) % 360 : ((this.hue + hue) % 360) + 360;
		}

		if (saturation) {
			if (saturation < -1 || saturation > 1) {
				throw new RangeError(
					`Invalid saturation value: ${saturation}. Must be between -1 and 1 inclusive.`
				);
			}

			values.saturation =
				saturation > 0
					? Math.min(1, this.saturation + saturation)
					: Math.max(0, this.saturation + saturation);
		}

		if (lightness) {
			if (lightness < -1 || lightness > 1) {
				throw new RangeError(
					`Invalid lightness value: ${lightness}. Must be between -1 and 1 inclusive.`
				);
			}

			values.lightness =
				lightness > 0
					? Math.min(1, this.lightness + lightness)
					: Math.max(0, this.lightness + lightness);
		}

		return values;
	}

	/** A helper function to get the adjusted HWB values. */
	private _adjustHwb({ hue = 0, whiteness = 0, blackness = 0 }: AdjustableHWBValues = {}) {
		const values = {
			hue: this.hue,
			whiteness: this.whiteness,
			blackness: this.blackness
		};

		if (hue) {
			values.hue = hue > 0 ? (this.hue + hue) % 360 : ((this.hue + hue) % 360) + 360;
		}

		if (whiteness) {
			if (whiteness < -1 || whiteness > 1) {
				throw new RangeError(
					`Invalid whiteness value: ${whiteness}. Must be between -1 and 1 inclusive.`
				);
			}

			values.whiteness =
				whiteness > 0
					? Math.min(1, this.whiteness + whiteness)
					: Math.max(0, this.whiteness + whiteness);
		}

		if (blackness) {
			if (blackness < -1 || blackness > 1) {
				throw new RangeError(
					`Invalid blackness value: ${blackness}. Must be between -1 and 1 inclusive.`
				);
			}

			values.blackness =
				blackness > 0
					? Math.min(1, this.blackness + blackness)
					: Math.max(0, this.blackness + blackness);
		}

		return values;
	}

	/** A helper function to get the adjusted RGB values. */
	private _adjustRgb({ red = 0, green = 0, blue = 0 }: AdjustableRGBValues = {}) {
		const values = { red: this.red, green: this.green, blue: this.blue };

		if (red) {
			if (red < -255 || red > 255) {
				throw new RangeError(`Invalid red value: ${red}. Must be between -255 and 255 inclusive.`);
			}

			values.red = red > 0 ? Math.min(255, this.red + red) : Math.max(0, this.red + red);
		}

		if (green) {
			if (green < -255 || green > 255) {
				throw new RangeError(
					`Invalid green value: ${green}. Must be between -255 and 255 inclusive.`
				);
			}

			values.green =
				green > 0 ? Math.min(255, this.green + green) : Math.max(0, this.green + green);
		}

		if (blue) {
			if (blue < -255 || blue > 255) {
				throw new RangeError(
					`Invalid blue value: ${blue}. Must be between -255 and 255 inclusive.`
				);
			}

			values.blue = blue > 0 ? Math.min(255, this.blue + blue) : Math.max(0, this.blue + blue);
		}

		return values;
	}

	/** A helper function to get the changed RGB values. */
	private _changeRgb({ red, green, blue }: AdjustableRGBValues = {}) {
		const values = { red: this.red, green: this.green, blue: this.blue };

		if (red !== undefined) {
			if (red < 0 || red > 255) {
				throw new RangeError(`Invalid red value: ${red}. Must be between 0 and 255 inclusive.`);
			}

			values.red = red;
		}

		if (green !== undefined) {
			if (green < 0 || green > 255) {
				throw new RangeError(`Invalid green value: ${green}. Must be between 0 and 255 inclusive.`);
			}

			values.green = green;
		}

		if (blue !== undefined) {
			if (blue < 0 || blue > 255) {
				throw new RangeError(`Invalid blue value: ${blue}. Must be between 0 and 255 inclusive.`);
			}

			values.blue = blue;
		}

		return values;
	}

	/** A helper function to get the changed HSL values. */
	private _changeHsl({ hue, saturation, lightness }: AdjustableHSLValues = {}) {
		const values = {
			hue: this.hue,
			saturation: this.saturation,
			lightness: this.lightness
		};

		if (hue !== undefined) {
			values.hue = hue % 360;
		}

		if (saturation !== undefined) {
			if (saturation < 0 || saturation > 1) {
				throw new RangeError(
					`Invalid saturation value: ${saturation}. Must be between 0 and 1 inclusive.`
				);
			}

			values.saturation = saturation;
		}

		if (lightness !== undefined) {
			if (lightness < 0 || lightness > 1) {
				throw new RangeError(
					`Invalid lightness value: ${lightness}. Must be between 0 and 1 inclusive.`
				);
			}

			values.lightness = lightness;
		}

		return values;
	}

	/** A helper function to get the changed HWB values. */
	private _changeHwb({ hue, whiteness, blackness }: AdjustableHWBValues = {}) {
		const values = {
			hue: this.hue,
			whiteness: this.whiteness,
			blackness: this.blackness
		};

		if (hue !== undefined) {
			values.hue = hue % 360;
		}

		if (whiteness !== undefined) {
			if (whiteness < 0 || whiteness > 1) {
				throw new RangeError(
					`Invalid whiteness value: ${whiteness}. Must be between 0 and 1 inclusive.`
				);
			}

			values.whiteness = whiteness;
		}

		if (blackness !== undefined) {
			if (blackness < 0 || blackness > 1) {
				throw new RangeError(
					`Invalid blackness value: ${blackness}. Must be between 0 and 1 inclusive.`
				);
			}

			values.blackness = blackness;
		}

		return values;
	}

	/** A helper function to get the scaled RGB values. */
	private _scaleRgb({ red = 0, green = 0, blue = 0 }: ScalableRGBValues = {}) {
		const values = { red: this.red, green: this.green, blue: this.blue };

		if (red) {
			values.red =
				red > 0
					? Math.min((255 - this.red) * red + this.red, 255)
					: Math.max(this.red - this.red * Math.abs(red), 0);
		}

		if (green) {
			values.green =
				green > 0
					? Math.min((255 - this.green) * green + this.green, 255)
					: Math.max(this.green - this.green * Math.abs(green), 0);
		}

		if (blue) {
			values.blue =
				blue > 0
					? Math.min((255 - this.blue) * blue + this.blue, 255)
					: Math.max(this.blue - this.blue * Math.abs(blue), 0);
		}

		return values;
	}

	/** A helper function to get the scaled HSL values. */
	private _scaleHsl({ saturation = 0, lightness = 0 }: ScalableHSLValues = {}) {
		const values = {
			hue: this.hue,
			saturation: this.saturation,
			lightness: this.lightness
		};

		if (saturation) {
			values.saturation =
				saturation > 0
					? Math.min((1 - this.saturation) * saturation + this.saturation, 1)
					: Math.max(this.saturation - this.saturation * Math.abs(saturation), 0);
		}

		if (lightness) {
			values.lightness =
				lightness > 0
					? Math.min((1 - this.lightness) * lightness + this.lightness, 1)
					: Math.max(this.lightness - this.lightness * Math.abs(lightness), 0);
		}

		return values;
	}

	/** A helper function to get the scaled HWB values. */
	private _scaleHwb({ whiteness = 0, blackness = 0 }: ScalableHWBValues = {}) {
		const values = {
			hue: this.hue,
			whiteness: this.whiteness,
			blackness: this.blackness
		};

		if (whiteness) {
			values.whiteness =
				whiteness > 0
					? Math.min((1 - this.whiteness) * whiteness + this.whiteness, 1)
					: Math.max(this.whiteness - this.whiteness * Math.abs(whiteness), 0);
		}

		if (blackness) {
			values.blackness =
				blackness > 0
					? Math.min((1 - this.blackness) * blackness + this.blackness, 1)
					: Math.max(this.blackness - this.blackness * Math.abs(blackness), 0);
		}

		return values;
	}
}
