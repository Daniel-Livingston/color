import CMYK from "./cmyk";
import HSL from "./hsl";
import HSV from "./hsv";
import HWB from "./hwb";
import Color from "./color";

/**
 * A color in the RGB color space.
 */
export default class RGB extends Color {
  constructor(param: string | { r: number; g: number; b: number }) {
    super(param);

    this._space = "rgb";
    if (typeof param === "string") {
      this._parse(param);
    } else {
      this._r = param.r;
      this._g = param.g;
      this._b = param.b;
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
    return new HSV({ h: this.hue, s: this.saturation, v: this.brightness });
  }

  hwb(): Color {
    return new HWB({ h: this.hue, w: this.whiteness, b: this.blackness });
  }

  rgb(): Color {
    return this;
  }

  get array(): number[] {
    return [this.red, this.green, this.blue];
  }

  get object(): { [key: string]: number } {
    return { r: this.red, g: this.green, b: this.blue };
  }

  get string(): string {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  protected _parse(color: string): void {
    if (color.startsWith("#")) {
      this._parseHex(color);
      return;
    }

    if (color.startsWith("rgb")) {
      this._parseRgb(color);
      return;
    }

    throw new Error("Invalid color");
  }

  /** A helper function to parse a Hex value. e.g., `#000` or `#000000`. */
  private _parseHex(color: string) {
    if (color.length === 4) {
      this._parseHexShort(color);
      return;
    }

    if (color.length === 7) {
      this._parseHexLong(color);
      return;
    }

    throw new Error("Invalid color");
  }

  /** A helper function to parse a Hex value written in shorthand. e.g., `#000`. */
  private _parseHexShort(color: string) {
    const r = parseInt(color[1], 16);
    const g = parseInt(color[2], 16);
    const b = parseInt(color[3], 16);

    this._r = r * 17;
    this._g = g * 17;
    this._b = b * 17;
  }

  /** A helper function to parse a Hex value written in long form. e.g., `#000000`. */
  private _parseHexLong(color: string) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    this._r = r;
    this._g = g;
    this._b = b;
  }

  /** A helper function to parse an RGB value. e.g., `rgb(0, 0, 0)`. */
  private _parseRgb(color: string) {
    const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    if (match) {
      this._r = parseInt(match[1], 10);
      this._g = parseInt(match[2], 10);
      this._b = parseInt(match[3], 10);
      return;
    }

    throw new Error("Invalid color");
  }

  protected _cmyk(): [number, number, number, number] {
    return RGB.rgbToCmyk(this._r!, this._g!, this._b!);
  }

  protected _hsl(): [number, number, number] {
    return RGB.rgbToHsl(this._r!, this._g!, this._b!);
  }

  protected _hsv(): [number, number, number] {
    return RGB.rgbToHsv(this._r!, this._g!, this._b!);
  }

  protected _hwb(): [number, number, number] {
    return RGB.rgbToHwb(this._r!, this._g!, this._b!);
  }

  protected _rgb(): [number, number, number] {
    return [this._r!, this._g!, this._b!];
  }
}
