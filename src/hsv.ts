import Color from "./color";
import CMYK from "./cmyk";
import HSL from "./hsl";
import HWB from "./hwb";
import RGB from "./rgb";

/**
 * A color in the HSV color space.
 */
export default class HSV extends Color {
  constructor(param: string | { h: number; s: number; v: number }) {
    super(param);

    if (typeof param === "string") {
      this._parse(param);
    } else {
      this._h = param.h;
      this._s = param.s;
      this._v = param.v;
    }
  }

  cmyk(): Color {
    return new CMYK({
      c: this.cyan,
      m: this.magenta,
      y: this.yellow,
      k: this.blackness,
    });
  }

  hsl(): Color {
    return new HSL({ h: this.hue, s: this.saturation, l: this.lightness });
  }

  hsv(): Color {
    return this;
  }

  hwb(): Color {
    return new HWB({ h: this.hue, w: this.whiteness, b: this.blackness });
  }

  rgb(): Color {
    return new RGB({ r: this.red, g: this.green, b: this.blue });
  }

  get array(): number[] {
    return [this.hue, this.saturation, this.brightness];
  }

  get object(): { [key: string]: number } {
    return { h: this.hue, s: this.saturation, v: this.brightness };
  }

  get string(): string {
    return `hsv(${this.hue}, ${this.saturation * 100}%, ${
      this.brightness * 100
    }%)`;
  }

  protected _cmyk(): [number, number, number, number] {
    const [r, g, b] = this._rgb();
    return HSV.rgbToCmyk(r, g, b);
  }

  protected _hsl(): [number, number, number] {
    const h = this._h!;
    const s = this._s!;
    const v = this._v!;

    const l = v - (v * s) / 2;
    const s2 = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);

    return [h, Math.round(s2 * 100) / 100, Math.round(l * 100) / 100];
  }

  protected _hsv(): [number, number, number] {
    return [this._h!, this._s!, this._v!];
  }

  protected _hwb(): [number, number, number] {
    const [r, g, b] = this._rgb();
    return HSV.rgbToHwb(r, g, b);
  }

  protected _rgb(): [number, number, number] {
    return HSV.hsvToRgb(this._h!, this._s!, this._v!);
  }

  protected _parse(color: string) {
    const match = color.match(/^hsv\((\d+),\s*(\d+)%?,\s*(\d+)%?\)$/);

    if (match) {
      this._h = parseInt(match[1], 10);
      this._s = parseInt(match[2], 10) / 100;
      this._v = parseInt(match[3], 10) / 100;
      return;
    }

    throw new Error("Invalid color");
  }
}
