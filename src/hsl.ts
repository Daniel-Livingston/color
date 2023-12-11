import CMYK from "./cmyk";
import HSV from "./hsv";
import HWB from "./hwb";
import RGB from "./rgb";
import Color from "./color";
import type { HSLObject } from "./types";

/**
 * A color in the HSL color space.
 */
export default class HSL extends Color {
  constructor(param: string | HSLObject) {
    super(param);

    this._space = "hsl";
    if (typeof param === "string") {
      this._parse(param);
    } else {
      if (param.saturation === 0) {
        this._h = 0;
        this._s = 0;
        this._l = param.lightness;
        return;
      }

      this._h = param.hue >= 0 ? param.hue % 360 : (param.hue % 360) + 360;
      this._s = param.saturation;
      this._l = param.lightness;
    }
  }

  get array(): number[] {
    return [this.hue, this.saturation, this.lightness];
  }

  cmyk(): Color {
    return new CMYK({
      cyan: this.cyan,
      magenta: this.magenta,
      yellow: this.yellow,
      key: this.blackness,
    });
  }

  hsl(): Color {
    return this;
  }

  hsv(): Color {
    return new HSV({
      hue: this.hue,
      saturation: this.saturation,
      value: this.brightness,
    });
  }

  hwb(): Color {
    return new HWB({
      hue: this.hue,
      whiteness: this.whiteness,
      blackness: this.blackness,
    });
  }

  get object(): { [key: string]: number } {
    return {
      hue: this.hue,
      saturation: this.saturation,
      lightness: this.lightness,
    };
  }

  rgb(): Color {
    return new RGB({ red: this.red, green: this.green, blue: this.blue });
  }

  get string(): string {
    return `hsl(${this.hue}, ${this.saturation * 100}%, ${
      this.lightness * 100
    }%)`;
  }

  protected _cmyk(): [number, number, number, number] {
    const [r, g, b] = this._rgb();
    return HSL._rgbToCmyk(r, g, b);
  }

  protected _hsl(): [number, number, number] {
    return [this._h!, this._s!, this._l!];
  }

  protected _hsv(): [number, number, number] {
    const h = this._h!;
    const s = this._s!;
    const l = this._l!;

    const v = l + s * Math.min(l, 1 - l);
    const s2 = v === 0 ? 0 : 2 - (2 * l) / v;

    return [h, s2, v];
  }

  protected _hwb(): [number, number, number] {
    const [r, g, b] = this._rgb();
    return HSL._rgbToHwb(r, g, b);
  }

  protected _parse(color: string): void {
    const match = color.match(/^hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)$/);

    if (match) {
      this._h = parseInt(match[1], 10);
      this._s = parseInt(match[2], 10) / 100;
      this._l = parseInt(match[3], 10) / 100;
      return;
    }

    throw new Error("Invalid color");
  }

  protected _rgb(): [number, number, number] {
    const h = this._h!;
    const s = this._s!;
    const l = this._l!;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
  }
}
