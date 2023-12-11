import HSL from "./hsl";
import HSV from "./hsv";
import HWB from "./hwb";
import RGB from "./rgb";
import Color from "./color";
import type { CMYKObject } from "./types";

/**
 * A color in the CMYK color space.
 */
export default class CMYK extends Color {
  constructor(param: string | CMYKObject) {
    super(param);

    this._space = "cmyk";
    if (typeof param === "string") {
      this._parse(param);
    } else {
      this._c = param.cyan;
      this._m = param.magenta;
      this._y = param.yellow;
      this._k = param.key;
    }
  }

  get array(): number[] {
    return [this.cyan, this.magenta, this.yellow, this.blackness];
  }

  cmyk(): Color {
    return this;
  }

  hsl(): Color {
    return new HSL({
      hue: this.hue,
      saturation: this.saturation,
      lightness: this.lightness,
    });
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
      cyan: this.cyan,
      magenta: this.magenta,
      yellow: this.yellow,
      key: this.blackness,
    };
  }

  rgb(): Color {
    return new RGB({ red: this.red, green: this.green, blue: this.blue });
  }

  get string(): string {
    return `cmyk(${this.cyan * 100}%, ${this.magenta * 100}%, ${
      this.yellow * 100
    }%, ${this.blackness * 100}%)`;
  }

  protected _cmyk(): [number, number, number, number] {
    return [this._c!, this._m!, this._y!, this._k!];
  }

  protected _hsl(): [number, number, number] {
    const [r, g, b] = this._rgb();
    return CMYK._rgbToHsl(r, g, b);
  }

  protected _hsv(): [number, number, number] {
    const [r, g, b] = this._rgb();
    return CMYK._rgbToHsv(r, g, b);
  }

  protected _hwb(): [number, number, number] {
    const [r, g, b] = this._rgb();
    return CMYK._rgbToHwb(r, g, b);
  }

  protected _parse(color: string): void {
    const match = color.match(
      /^cmyk\((\d+)%?,\s*(\d+)%?,\s*(\d+)%?,\s*(\d+)%?\)$/
    );

    if (match) {
      this._c = parseInt(match[1], 10) / 100;
      this._m = parseInt(match[2], 10) / 100;
      this._y = parseInt(match[3], 10) / 100;
      this._k = parseInt(match[4], 10) / 100;
      return;
    }

    throw new Error("Invalid color");
  }

  protected _rgb(): [number, number, number] {
    const [c, m, y, k] = [this._c!, this._m!, this._y!, this._k!];

    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);

    return [r, g, b];
  }
}
