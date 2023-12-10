import HSL from "./hsl";
import HSV from "./hsv";
import HWB from "./hwb";
import RGB from "./rgb";
import Color from "./color";

/**
 * A color in the CMYK color space.
 */
export default class CMYK extends Color {
  constructor(param: string | { c: number; m: number; y: number; k: number }) {
    super(param);

    this._space = "cmyk";
    if (typeof param === "string") {
      this._parse(param);
    } else {
      this._c = param.c;
      this._m = param.m;
      this._y = param.y;
      this._k = param.k;
    }
  }

  cmyk(): Color {
    return this;
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
    return new RGB({ r: this.red, g: this.green, b: this.blue });
  }

  get array(): number[] {
    return [this.cyan, this.magenta, this.yellow, this.blackness];
  }

  get object(): { [key: string]: number } {
    return { c: this.cyan, m: this.magenta, y: this.yellow, k: this.blackness };
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
    return CMYK.rgbToHsl(r, g, b);
  }

  protected _hsv(): [number, number, number] {
    const [r, g, b] = this._rgb();
    return CMYK.rgbToHsv(r, g, b);
  }

  protected _hwb(): [number, number, number] {
    const [r, g, b] = this._rgb();
    return CMYK.rgbToHwb(r, g, b);
  }

  protected _rgb(): [number, number, number] {
    const c = this._c!;
    const m = this._m!;
    const y = this._y!;
    const k = this._k!;

    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);

    return [Math.round(r), Math.round(g), Math.round(b)];
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
}
