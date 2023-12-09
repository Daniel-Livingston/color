export default class Color {
  private _space: "cmyk" | "hsl" | "hsv" | "hwb" | "rgb";
  private _c: number | null = null;
  private _m: number | null = null;
  private _y: number | null = null;
  private _k: number | null = null;
  private _h: number | null = null;
  private _s: number | null = null;
  private _l: number | null = null;
  private _v: number | null = null;
  private _w: number | null = null;
  private _r: number | null = null;
  private _g: number | null = null;
  private _b: number | null = null;
  private _hex: string | null = null;

  constructor(
    param:
      | string
      | { c: number; m: number; y: number; k: number }
      | { h: number; s: number; l: number }
      | { h: number; s: number; v: number }
      | { h: number; w: number; b: number }
      | { r: number; g: number; b: number }
  ) {
    if (typeof param === "string") {
      throw new Error("Not implemented");
    }

    if ("c" in param) {
      this._space = "cmyk";
      this._c = param.c;
      this._m = param.m;
      this._y = param.y;
      this._k = param.k;
      return;
    }

    if ("l" in param) {
      this._space = "hsl";
      this._h = param.h;
      this._s = param.s;
      this._l = param.l;
      return;
    }

    if ("v" in param) {
      this._space = "hsv";
      this._h = param.h;
      this._s = param.s;
      this._v = param.v;
      return;
    }

    if ("w" in param) {
      this._space = "hwb";
      this._h = param.h;
      this._w = param.w;
      this._k = param.b;
      return;
    }

    if ("r" in param) {
      this._space = "rgb";
      this._r = param.r;
      this._g = param.g;
      this._b = param.b;
      return;
    }

    throw new Error("Invalid color");
  }

  static cmyk(c: number, m: number, y: number, k: number): Color {
    return new Color({ c, m, y, k });
  }

  static hsl(h: number, s: number, l: number): Color {
    return new Color({ h, s, l });
  }

  static hsv(h: number, s: number, v: number): Color {
    return new Color({ h, s, v });
  }

  static hwb(h: number, w: number, b: number): Color {
    return new Color({ h, w, b });
  }

  static rgb(r: number, g: number, b: number): Color {
    return new Color({ r, g, b });
  }

  cmyk(): Color {
    const [c, m, y, k] = this._getCMYK();
    return Color.cmyk(c, m, y, k);
  }

  hsl(): Color {
    const [h, s, l] = this._getHSL();
    return Color.hsl(h, s, l);
  }

  hsv(): Color {
    throw new Error("Not implemented");
  }

  hwb(): Color {
    throw new Error("Not implemented");
  }

  rgb(): Color {
    const [r, g, b] = this._getRGB();
    return Color.rgb(r, g, b);
  }

  /**
   * Increase or decrease one or more properties of the color.
   */
  adjust(options: {
    hue?: number;
    saturation?: number;
    lightness?: number;
    whiteness?: number;
    blackness?: number;
  }): Color {
    throw new Error("Not implemented");
  }

  change(options: {
    hue?: number;
    saturation?: number;
    lightness?: number;
    whiteness?: number;
    blackness?: number;
  }): Color {
    throw new Error("Not implemented");
  }

  complement(): Color {
    throw new Error("Not implemented");
  }

  grayscale(): Color {
    throw new Error("Not implemented");
  }

  invert(): Color {
    throw new Error("Not implemented");
  }

  mix(color: Color, weight?: number): Color {
    throw new Error("Not implemented");
  }

  scale(options: {
    saturation?: number;
    lightness?: number;
    whiteness?: number;
    blackness?: number;
  }): Color {
    throw new Error("Not implemented");
  }

  get alpha(): number {
    throw new Error("Not implemented");
  }

  get opacity(): number {
    throw new Error("Not implemented");
  }

  private get _cyan(): number {
    if (this._c !== null) {
      return this._c;
    }

    const [c, m, y, k] = this._getCMYK();
    this._c = c;
    this._m = m;
    this._y = y;
    this._k = k;

    return this._c;
  }

  private get _magenta(): number {
    if (this._m !== null) {
      return this._m;
    }

    const [c, m, y, k] = this._getCMYK();
    this._c = c;
    this._m = m;
    this._y = y;
    this._k = k;

    return this._m;
  }

  private get _yellow(): number {
    if (this._y !== null) {
      return this._y;
    }

    const [c, m, y, k] = this._getCMYK();
    this._c = c;
    this._m = m;
    this._y = y;
    this._k = k;

    return this._y;
  }

  private get _key(): number {
    if (this._k !== null) {
      return this._k;
    }

    const [c, m, y, k] = this._getCMYK();
    this._c = c;
    this._m = m;
    this._y = y;
    this._k = k;

    return this._k;
  }

  get red(): number {
    if (this._r !== null) {
      return this._r;
    }

    const [r, g, b] = this._getRGB();
    this._r = r;
    this._g = g;
    this._b = b;

    return this._r;
  }

  get green(): number {
    if (this._g !== null) {
      return this._g;
    }

    const [r, g, b] = this._getRGB();
    this._r = r;
    this._g = g;
    this._b = b;

    return this._g;
  }

  get blue(): number {
    if (this._b !== null) {
      return this._b;
    }

    const [r, g, b] = this._getRGB();
    this._r = r;
    this._g = g;
    this._b = b;

    return this._b;
  }

  get hue(): number {
    if (this._h !== null) {
      return this._h;
    }

    const [h, s, l] = this._getHSL();
    this._h = h;
    this._s = s;
    this._l = l;

    return this._h;
  }

  get brightness(): number {
    if (this._v !== null) {
      return this._v;
    }

    throw new Error("Not implemented");
  }

  get saturation(): number {
    if (this._s !== null) {
      return this._s;
    }

    const [h, s, l] = this._getHSL();
    this._h = h;
    this._s = s;
    this._l = l;

    return this._s;
  }

  get lightness(): number {
    if (this._l !== null) {
      return this._l;
    }

    const [h, s, l] = this._getHSL();
    this._h = h;
    this._s = s;
    this._l = l;

    return this._l;
  }

  get blackness(): number {
    if (this._k !== null) {
      return this._k;
    }

    throw new Error("Not implemented");
  }

  get whiteness(): number {
    if (this._w !== null) {
      return this._w;
    }

    throw new Error("Not implemented");
  }

  get hex(): string {
    if (this._hex !== null) {
      return this._hex;
    }

    const r = this.red;
    const g = this.green;
    const b = this.blue;

    this._hex = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    return this._hex;
  }

  get array(): number[] {
    switch (this._space) {
      case "cmyk":
        return [this._cyan, this._magenta, this._yellow, this._key];
      case "hsl":
        return [this.hue, this.saturation, this.lightness];
      case "hsv":
        return [this.hue, this.saturation, this.brightness];
      case "hwb":
        return [this.hue, this.whiteness, this.blackness];
      case "rgb":
        return [this.red, this.green, this.blue];
      default:
        throw new Error("Invalid color space");
    }
  }

  get object(): { [key: string]: number } {
    switch (this._space) {
      case "cmyk":
        return {
          c: this._cyan,
          m: this._magenta,
          y: this._yellow,
          k: this._key,
        };
      case "hsl":
        return {
          h: this.hue,
          s: this.saturation,
          l: this.lightness,
        };
      case "hsv":
        return {
          h: this.hue,
          s: this.saturation,
          v: this.brightness,
        };
      case "hwb":
        return {
          h: this.hue,
          w: this.whiteness,
          b: this.blackness,
        };
      case "rgb":
        return {
          r: this.red,
          g: this.green,
          b: this.blue,
        };
      default:
        throw new Error("Invalid color space");
    }
  }

  get string(): string {
    switch (this._space) {
      case "cmyk":
        return `cmyk(${this._cyan * 100}%, ${this._magenta * 100}%, ${
          this._yellow * 100
        }%, ${this._key * 100}%)`;
      case "hsl":
        return `hsl(${this.hue}, ${this.saturation * 100}%, ${
          this.lightness * 100
        }%)`;
      case "hsv":
        return `hsv(${this.hue}, ${this.saturation * 100}%, ${
          this._v! * 100
        }%)`;
      case "hwb":
        return `hwb(${this.hue}, ${this.whiteness * 100}%, ${
          this.blackness * 100
        }%)`;
      case "rgb":
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
      default:
        throw new Error("Invalid color space");
    }
  }

  private _getCMYK(): [number, number, number, number] {
    switch (this._space) {
      case "cmyk":
        return [this._c!, this._m!, this._y!, this._k!];
      case "hsl":
        throw new Error("Not implemented");
      case "hsv":
        throw new Error("Not implemented");
      case "hwb":
        throw new Error("Not implemented");
      case "rgb":
        return this._getCMYKFromRGB();
      default:
        throw new Error("Invalid color space");
    }
  }

  private _getCMYKFromRGB(): [number, number, number, number] {
    const r = this.red / 255;
    const g = this.green / 255;
    const b = this.blue / 255;

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

  private _getHSL(): [number, number, number] {
    switch (this._space) {
      case "cmyk":
        throw new Error("Not implemented");
      case "hsl":
        return [this._h!, this._s!, this._l!];
      case "hsv":
        return this._getHSLFromHSV();
      case "hwb":
        throw new Error("Not implemented");
      case "rgb":
        return this._getHSLFromRGB();
      default:
        throw new Error("Invalid color space");
    }
  }

  private _getHSLFromHSV(): [number, number, number] {
    throw new Error("Not implemented");
  }

  private _getHSLFromRGB(): [number, number, number] {
    const r = this._r! / 255;
    const g = this._g! / 255;
    const b = this._b! / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    const l = (max + min) / 2;

    if (max === min) {
      return [0, 0, Math.round(l * 100)];
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

  private _getRGB(): [number, number, number] {
    switch (this._space) {
      case "cmyk":
        return this._getRGBFromCMYK();
      case "hsl":
        return this._getRGBFromHSL();
      case "hsv":
        throw new Error("Not implemented");
      case "hwb":
        throw new Error("Not implemented");
      case "rgb":
        return [this._r!, this._g!, this._b!];
      default:
        throw new Error("Invalid color space");
    }
  }

  private _getRGBFromCMYK(): [number, number, number] {
    const r = 255 * (1 - this._c!) * (1 - this._k!);
    const g = 255 * (1 - this._m!) * (1 - this._k!);
    const b = 255 * (1 - this._y!) * (1 - this._k!);

    return [Math.round(r), Math.round(g), Math.round(b)];
  }

  private _getRGBFromHSL(): [number, number, number] {
    const c = (1 - Math.abs(2 * this._l! - 1)) * this._s!;
    const x = c * (1 - Math.abs(((this._h! / 60) % 2) - 1));
    const m = this._l! - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (this._h! < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (this._h! < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (this._h! < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (this._h! < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (this._h! < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (this._h! < 360) {
      r = c;
      g = 0;
      b = x;
    }

    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255),
    ];
  }
}
