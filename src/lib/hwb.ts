import CMYK from './cmyk';
import HSL from './hsl';
import HSV from './hsv';
import RGB from './rgb';
import Color from './color';
import type { HWBObject } from './types';

/**
 * A color in the HWB color space.
 */
export default class HWB extends Color {
	constructor(param: string | HWBObject) {
		super(param);

		this._space = 'hwb';
		if (typeof param === 'string') {
			this._parse(param);
		} else {
			this._h = param.hue;
			this._w = param.whiteness;
			this._k = param.blackness;
		}
	}

	get array(): number[] {
		return [this.hue, this.whiteness, this.blackness];
	}

	cmyk(): Color {
		return new CMYK({
			cyan: this.cyan,
			magenta: this.magenta,
			yellow: this.yellow,
			key: this.blackness
		});
	}

	hsl(): Color {
		return new HSL({
			hue: this.hue,
			saturation: this.saturation,
			lightness: this.lightness
		});
	}

	hsv(): Color {
		return new HSV({
			hue: this.hue,
			saturation: this.saturation,
			value: this.brightness
		});
	}

	hwb(): Color {
		const [hue, whiteness, blackness] = this._hwb();
		return new HWB({ hue, whiteness, blackness });
	}

	get object(): { [key: string]: number } {
		return {
			hue: this.hue,
			whiteness: this.whiteness,
			blackness: this.blackness
		};
	}

	rgb(): Color {
		return new RGB({ red: this.red, green: this.green, blue: this.blue });
	}

	get string(): string {
		return `hwb(${this.hue}, ${this.whiteness * 100}%, ${this.blackness * 100}%)`;
	}

	protected _cmyk(): [number, number, number, number] {
		const [r, g, b] = this._rgb();
		return HSV._rgbToCmyk(r, g, b);
	}

	protected _hsl(): [number, number, number] {
		const [h, s, v] = this._hsv();
		const l = ((2 - s) * v) / 2;
		return [h, s, l];
	}

	protected _hsv(): [number, number, number] {
		const h = this._h!;
		const w = this._w!;
		const b = this._k!;

		let wScaled = w,
			bScaled = b;

		const sum = w + b;

		if (sum > 1) {
			const scale = 1 / sum;
			bScaled = b * scale;
			wScaled = w * scale;
		}

		if (bScaled === 1) {
			return [h, 0, 0];
		}

		const v = 1 - bScaled;
		const s = 1 - wScaled / (1 - bScaled);

		return [h, s, v];
	}

	protected _hwb(): [number, number, number] {
		return [this._h!, this._w!, this._k!];
	}

	protected _parse(color: string): void {
		const match = color.match(/^hwb\((\d+),\s*(\d+)%,\s*(\d+)%\)$/);

		if (match) {
			this._h = parseInt(match[1], 10);
			this._w = parseInt(match[2], 10) / 100;
			this._k = parseInt(match[3], 10) / 100;
			return;
		}

		throw new Error('Invalid color');
	}

	protected _rgb(): [number, number, number] {
		const [h, s, v] = this._hsv();
		return HSV._hsvToRgb(h, s, v);
	}
}
