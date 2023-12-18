import CMYK from './cmyk';
import HSL from './hsl';
import HWB from './hwb';
import RGB from './rgb';
import Color from './color';
import type { HSVObject } from './types';

/**
 * A color in the HSV color space.
 */
export default class HSV extends Color {
	constructor(param: string | HSVObject) {
		super(param);

		this._space = 'hsv';
		if (typeof param === 'string') {
			this._parse(param);
		} else {
			if (param.saturation === 0) {
				this._h = 0;
				this._s = 0;
				this._v = param.value;
				return;
			}

			this._h = param.hue >= 0 ? param.hue % 360 : (param.hue % 360) + 360;
			this._s = param.saturation;
			this._v = param.value;
		}
	}

	get array(): number[] {
		return [this.hue, this.saturation, this.brightness];
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
		const [hue, saturation, value] = this._hsv();
		return new HSV({ hue, saturation, value });
	}

	hwb(): Color {
		return new HWB({
			hue: this.hue,
			whiteness: this.whiteness,
			blackness: this.blackness
		});
	}

	get object(): { [key: string]: number } {
		return {
			hue: this.hue,
			saturation: this.saturation,
			value: this.brightness
		};
	}

	rgb(): Color {
		return new RGB({ red: this.red, green: this.green, blue: this.blue });
	}

	get string(): string {
		return `hsv(${this.hue}, ${this.saturation * 100}%, ${this.brightness * 100}%)`;
	}

	protected _cmyk(): [number, number, number, number] {
		const [r, g, b] = this._rgb();
		return HSV._rgbToCmyk(r, g, b);
	}

	protected _hsl(): [number, number, number] {
		const h = this._h!;
		const s = this._s!;
		const v = this._v!;

		const l = v - (v * s) / 2;
		const s2 = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);

		return [h, s2, l];
	}

	protected _hsv(): [number, number, number] {
		return [this._h!, this._s!, this._v!];
	}

	protected _hwb(): [number, number, number] {
		const [r, g, b] = this._rgb();
		return HSV._rgbToHwb(r, g, b);
	}

	protected _parse(color: string) {
		const match = color.match(/^hsv\((\d+),\s*(\d+)%,\s*(\d+)%\)$/);

		if (match) {
			this._h = parseInt(match[1], 10);
			this._s = parseInt(match[2], 10) / 100;
			this._v = parseInt(match[3], 10) / 100;
			return;
		}

		throw new Error('Invalid color');
	}

	protected _rgb(): [number, number, number] {
		return HSV._hsvToRgb(this._h!, this._s!, this._v!);
	}
}
