import HSL from "./hsl";
import HWB from "./hwb";
import RGB from "./rgb";

type ColorParam =
  | string
  | { c: number; m: number; y: number; k: number }
  | { h: number; s: number; l: number }
  | { h: number; s: number; v: number }
  | { h: number; w: number; b: number }
  | { r: number; g: number; b: number };

export type AdjustableColorValues =
  | { red: number; green: number; blue: number }
  | { hue: number; saturation: number; lightness: number }
  | { hue: number; whiteness: number; blackness: number };

type ColorSpace = "cmyk" | "hsl" | "hsv" | "hwb" | "rgb";

/**
 * A color within a specific color space.
 */
export default abstract class Color {
  protected _space: ColorSpace = "rgb";
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
   * Convert a color to the RGB color space.
   */
  abstract rgb(): Color;

  /**
   * The array form of a color in the current color space.
   *
   * e.g., `color('#000').cmyk().array` returns `[0, 0, 0, 1]`.
   *
   * @readonly
   */
  abstract get array(): number[];

  /**
   * The object form of a color in the current color space.
   *
   * e.g., `color('#000').cmyk().object` returns `{ c: 0, m: 0, y: 0, k: 1 }`.
   *
   * @readonly
   */
  abstract get object(): { [key: string]: number };

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
   * Get the RGB values for the color.
   */
  protected abstract _rgb(): [number, number, number];

  /**
   * Parse a color string.
   */
  protected abstract _parse(color: string): void;

  /**
   * Increase or decrease one or more properties of a color by fixed amounts.
   *
   * Must only specify changes in one color space at a time. (e.g., `adjust({red: 10, hue: 260})` is invalid.).
   */
  adjust(options: Partial<AdjustableColorValues>): Color {
    if ("red" in options || "green" in options || "blue" in options) {
      const newValues = this._adjustRgb(options);
      return new RGB(newValues)[this._space]();
    }

    if ("whiteness" in options || "blackness" in options) {
      const newValues = this._adjustHwb(options);
      return new HWB(newValues)[this._space]();
    }

    if ("hue" in options || "saturation" in options || "lightness" in options) {
      const newValues = this._adjustHsl(options);
      return new HSL(newValues)[this._space]();
    }

    return this;
  }

  /** A helper function to get the adjusted RGB values. */
  private _adjustRgb({
    red = 0,
    green = 0,
    blue = 0,
  }: { red?: number; green?: number; blue?: number } = {}) {
    const values = { r: this.red, g: this.green, b: this.blue };

    if (red) {
      if (red < -255 || red > 255) {
        throw new RangeError(
          `Invalid red value: ${red}. Must be between -255 and 255 inclusive.`
        );
      }

      values.r =
        red > 0 ? Math.min(255, this.red + red) : Math.max(0, this.red + red);
    }

    if (green) {
      if (green < -255 || green > 255) {
        throw new RangeError(
          `Invalid green value: ${green}. Must be between -255 and 255 inclusive.`
        );
      }

      values.g =
        green > 0
          ? Math.min(255, this.green + green)
          : Math.max(0, this.green + green);
    }

    if (blue) {
      if (blue < -255 || blue > 255) {
        throw new RangeError(
          `Invalid blue value: ${blue}. Must be between -255 and 255 inclusive.`
        );
      }

      values.b =
        blue > 0
          ? Math.min(255, this.blue + blue)
          : Math.max(0, this.blue + blue);
    }

    return values;
  }

  /** A helper function to get the adjusted HSL values. */
  private _adjustHsl({
    hue = 0,
    saturation = 0,
    lightness = 0,
  }: { hue?: number; saturation?: number; lightness?: number } = {}) {
    const values = {
      h: this.hue,
      s: this.saturation,
      l: this.lightness,
    };

    if (hue) {
      values.h =
        hue > 0 ? (this.hue + hue) % 360 : ((this.hue + hue) % 360) + 360;
    }

    if (saturation) {
      if (saturation < -1 || saturation > 1) {
        throw new RangeError(
          `Invalid saturation value: ${saturation}. Must be between -1 and 1 inclusive.`
        );
      }

      values.s =
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

      values.l =
        lightness > 0
          ? Math.min(1, this.lightness + lightness)
          : Math.max(0, this.lightness + lightness);
    }

    return values;
  }

  /** A helper function to get the adjusted HWB values. */
  private _adjustHwb({
    hue = 0,
    whiteness = 0,
    blackness = 0,
  }: { hue?: number; whiteness?: number; blackness?: number } = {}) {
    const values = {
      h: this.hue,
      w: this.whiteness,
      b: this.blackness,
    };

    if (hue) {
      values.h =
        hue > 0 ? (this.hue + hue) % 360 : ((this.hue + hue) % 360) + 360;
    }

    if (whiteness) {
      if (whiteness < -1 || whiteness > 1) {
        throw new RangeError(
          `Invalid whiteness value: ${whiteness}. Must be between -1 and 1 inclusive.`
        );
      }

      values.w =
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

      values.b =
        blackness > 0
          ? Math.min(1, this.blackness + blackness)
          : Math.max(0, this.blackness + blackness);
    }

    return values;
  }

  change(options: Partial<AdjustableColorValues>): Color {
    if ("red" in options || "green" in options || "blue" in options) {
      const newValues = this._changeRgb(options);
      return new RGB(newValues)[this._space]();
    }

    if ("whiteness" in options || "blackness" in options) {
      const newValues = this._changeHwb(options);
      return new HWB(newValues)[this._space]();
    }

    if ("hue" in options || "saturation" in options || "lightness" in options) {
      const newValues = this._changeHsl(options);
      return new HSL(newValues)[this._space]();
    }

    return this;
  }

  /** A helper function to get the changed RGB values. */
  private _changeRgb({
    red,
    green,
    blue,
  }: { red?: number; green?: number; blue?: number } = {}) {
    const values = { r: this.red, g: this.green, b: this.blue };

    if (red !== undefined) {
      if (red < 0 || red > 255) {
        throw new RangeError(
          `Invalid red value: ${red}. Must be between 0 and 255 inclusive.`
        );
      }

      values.r = red;
    }

    if (green !== undefined) {
      if (green < 0 || green > 255) {
        throw new RangeError(
          `Invalid green value: ${green}. Must be between 0 and 255 inclusive.`
        );
      }

      values.g = green;
    }

    if (blue !== undefined) {
      if (blue < 0 || blue > 255) {
        throw new RangeError(
          `Invalid blue value: ${blue}. Must be between 0 and 255 inclusive.`
        );
      }

      values.b = blue;
    }

    return values;
  }

  /** A helper function to get the changed HSL values. */
  private _changeHsl({
    hue,
    saturation,
    lightness,
  }: { hue?: number; saturation?: number; lightness?: number } = {}) {
    const values = {
      h: this.hue,
      s: this.saturation,
      l: this.lightness,
    };

    if (hue !== undefined) {
      values.h = hue % 360;
    }

    if (saturation !== undefined) {
      if (saturation < 0 || saturation > 1) {
        throw new RangeError(
          `Invalid saturation value: ${saturation}. Must be between 0 and 1 inclusive.`
        );
      }

      values.s = saturation;
    }

    if (lightness !== undefined) {
      if (lightness < 0 || lightness > 1) {
        throw new RangeError(
          `Invalid lightness value: ${lightness}. Must be between 0 and 1 inclusive.`
        );
      }

      values.l = lightness;
    }

    return values;
  }

  /** A helper function to get the changed HWB values. */
  private _changeHwb({
    hue,
    whiteness,
    blackness,
  }: { hue?: number; whiteness?: number; blackness?: number } = {}) {
    const values = {
      h: this.hue,
      w: this.whiteness,
      b: this.blackness,
    };

    if (hue !== undefined) {
      values.h = hue % 360;
    }

    if (whiteness !== undefined) {
      if (whiteness < 0 || whiteness > 1) {
        throw new RangeError(
          `Invalid whiteness value: ${whiteness}. Must be between 0 and 1 inclusive.`
        );
      }

      values.w = whiteness;
    }

    if (blackness !== undefined) {
      if (blackness < 0 || blackness > 1) {
        throw new RangeError(
          `Invalid blackness value: ${blackness}. Must be between 0 and 1 inclusive.`
        );
      }

      values.b = blackness;
    }

    return values;
  }

  /**
   * The complement of this color in the same color space.
   */
  complement(): Color {
    return this.adjust({ hue: 180 });
  }

  /**
   * The gray color with the same lightness as this color in the same color space.
   */
  grayscale(): Color {
    return this.change({ saturation: 0 });
  }

  /**
   * The cyan value for the color.
   *
   * @readonly
   */
  get cyan(): number {
    if (this._c !== null) {
      return this._c;
    }

    const [c, m, y, k] = this._cmyk();
    this._m = m;
    this._y = y;
    this._k = k;
    return (this._c = c);
  }

  /**
   * The magenta value for the color.
   *
   * @readonly
   */
  get magenta(): number {
    if (this._m !== null) {
      return this._m;
    }

    const [c, m, y, k] = this._cmyk();
    this._c = c;
    this._y = y;
    this._k = k;
    return (this._m = m);
  }

  /**
   * The yellow value for the color.
   *
   * @readonly
   */
  get yellow(): number {
    if (this._y !== null) {
      return this._y;
    }

    const [c, m, y, k] = this._cmyk();
    this._c = c;
    this._m = m;
    this._k = k;
    return (this._y = y);
  }

  /**
   * The hue value for the color.
   *
   * @readonly
   */
  get hue(): number {
    if (this._h !== null) {
      return this._h;
    }

    const [h, s, l] = this._hsl();
    this._s = s;
    this._l = l;
    return (this._h = h);
  }

  /**
   * The saturation value for the color.
   *
   * @readonly
   */
  get saturation(): number {
    if (this._s !== null) {
      return this._s;
    }

    const [h, s, l] = this._hsl();
    this._h = h;
    this._l = l;
    return (this._s = s);
  }

  /**
   * The lightness value for the color.
   *
   * @readonly
   */
  get lightness(): number {
    if (this._l !== null) {
      return this._l;
    }

    const [h, s, l] = this._hsl();
    this._h = h;
    this._s = s;
    return (this._l = l);
  }

  /**
   * The brightness value for the color.
   *
   * @readonly
   */
  get brightness(): number {
    if (this._v !== null) {
      return this._v;
    }

    const [h, s, v] = this._hsv();
    this._h = h;
    this._s = s;
    return (this._v = v);
  }

  /**
   * The whiteness value for the color.
   *
   * @readonly
   */
  get whiteness(): number {
    if (this._w !== null) {
      return this._w;
    }

    const [h, w, b] = this._hwb();
    this._h = h;
    this._k = b;
    return (this._w = w);
  }

  /**
   * The blackness value for the color.
   *
   * @readonly
   */
  get blackness(): number {
    if (this._k !== null) {
      return this._k;
    }

    const [h, w, b] = this._hwb();
    this._h = h;
    this._w = w;
    return (this._k = b);
  }

  /**
   * The red value for the color.
   *
   * @readonly
   */
  get red(): number {
    if (this._r !== null) {
      return this._r;
    }

    const [r, g, b] = this._rgb();
    this._g = g;
    this._b = b;
    return (this._r = r);
  }

  /**
   * The green value for the color.
   *
   * @readonly
   */
  get green(): number {
    if (this._g !== null) {
      return this._g;
    }

    const [r, g, b] = this._rgb();
    this._r = r;
    this._b = b;
    return (this._g = g);
  }

  /**
   * The blue value for the color.
   *
   * @readonly
   */
  get blue(): number {
    if (this._b !== null) {
      return this._b;
    }

    const [r, g, b] = this._rgb();
    this._r = r;
    this._g = g;
    return (this._b = b);
  }

  /**
   * The hex value for the color.
   *
   * @readonly
   */
  get hex(): string {
    if (this._hex !== null) {
      return this._hex;
    }

    const red = this.red;
    const green = this.green;
    const blue = this.blue;

    return (this._hex = `#${red.toString(16).padStart(2, "0")}${green
      .toString(16)
      .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`);
  }

  /** A helper function to convert HSV values to RGB values. */
  protected static hsvToRgb(
    h: number,
    s: number,
    v: number
  ): [number, number, number] {
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
          "Something went wrong when converting from HSV to RGB. Input was " +
            [h, s, v].join(", ")
        );
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  /** A helper function to convert RGB values to CMYK values. */
  protected static rgbToCmyk(
    r: number,
    g: number,
    b: number
  ): [number, number, number, number] {
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

    return [
      Math.round(c * 100) / 100,
      Math.round(m * 100) / 100,
      Math.round(y * 100) / 100,
      Math.round(k * 100) / 100,
    ];
  }

  /** A helper function to convert RGB values to HSL values. */
  protected static rgbToHsl(
    r: number,
    g: number,
    b: number
  ): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    const l = (max + min) / 2;

    if (max === min) {
      return [0, 0, Math.round(l * 100) / 100];
    }

    const s =
      l <= 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);

    let h = 0;
    if (max === r) {
      h = (g - b) / (max - min);
    } else if (max === g) {
      h = 2 + (b - r) / (max - min);
    } else {
      h = 4 + (r - g) / (max - min);
    }

    h = Math.round(h * 60);
    if (h < 0) {
      h += 360;
    }

    return [h, Math.round(s * 100) / 100, Math.round(l * 100) / 100];
  }

  /** A helper function to convert RGB values to HSV values. */
  protected static rgbToHsv(
    r: number,
    g: number,
    b: number
  ): [number, number, number] {
    const [h, s, l] = Color.rgbToHsl(r, g, b);
    const v = l + s * Math.min(l, 1 - l);
    const s2 = v === 0 ? 0 : 2 - (2 * l) / v;

    return [h, Math.round(s2 * 100) / 100, Math.round(v * 100) / 100];
  }

  /** A helper function to convert RGB values to HWB values. */
  protected static rgbToHwb(
    r: number,
    g: number,
    b: number
  ): [number, number, number] {
    const [h] = Color.rgbToHsl(r, g, b);

    r /= 255;
    g /= 255;
    b /= 255;

    const w = Math.min(r, g, b);
    const b2 = 1 - Math.max(r, g, b);

    return [h, Math.round(w * 100) / 100, Math.round(b2 * 100) / 100];
  }
}
