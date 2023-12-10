export default class Color {
  private _space: "cmyk" | "hsl" | "hsv" | "hwb" | "rgb" | null = null;
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
      this._parse(param);
      return;
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
    const [c, m, y, k] = this._getCmyk();
    return Color.cmyk(c, m, y, k);
  }

  hsl(): Color {
    const [h, s, l] = this._getHSL();
    return Color.hsl(h, s, l);
  }

  hsv(): Color {
    const [h, s, v] = this._getHSV();
    return Color.hsv(h, s, v);
  }

  hwb(): Color {
    const [h, w, b] = this._getHWB();
    return Color.hwb(h, w, b);
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

    const [c, m, y, k] = this._getCmyk();
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

    const [c, m, y, k] = this._getCmyk();
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

    const [c, m, y, k] = this._getCmyk();
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

    const [c, m, y, k] = this._getCmyk();
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

    const [h, s, v] = this._getHSV();
    this._h = h;
    this._s = s;
    this._v = v;

    return this._v;
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

    const [h, w, b] = this._getHWB();
    this._h = h;
    this._w = w;
    this._k = b;

    return this._k;
  }

  get whiteness(): number {
    if (this._w !== null) {
      return this._w;
    }

    const [h, w, b] = this._getHWB();
    this._h = h;
    this._w = w;
    this._k = b;

    return this._w;
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

  private _getCmyk(): [number, number, number, number] {
    switch (this._space) {
      case "cmyk":
        return [this._c!, this._m!, this._y!, this._k!];
      case "hsl":
        return Color._hslToCmyk(this._h!, this._s!, this._l!);
      case "hsv":
        return Color._hsvToCmyk(this._h!, this._s!, this._v!);
      case "hwb":
        return Color._hwbToCmyk(this._h!, this._w!, this._k!);
      case "rgb":
        return Color._rgbToCmyk(this._r!, this._g!, this._b!);
      default:
        throw new Error("Invalid color space");
    }
  }

  private _getHSL(): [number, number, number] {
    switch (this._space) {
      case "cmyk":
        return Color._cmykToHsl(this._c!, this._m!, this._y!, this._k!);
      case "hsl":
        return [this._h!, this._s!, this._l!];
      case "hsv":
        return Color._hsvToHsl(this._h!, this._s!, this._v!);
      case "hwb":
        return Color._hwbToHsl(this._h!, this._w!, this._k!);
      case "rgb":
        return Color._rgbToHsl(this._r!, this._g!, this._b!);
      default:
        throw new Error("Invalid color space");
    }
  }

  private _getHSV(): [number, number, number] {
    switch (this._space) {
      case "cmyk":
        return Color._cmykToHsv(this._c!, this._m!, this._y!, this._k!);
      case "hsl":
        return Color._hslToHsv(this._h!, this._s!, this._l!);
      case "hsv":
        return [this._h!, this._s!, this._v!];
      case "hwb":
        return Color._hwbToHsv(this._h!, this._w!, this._k!);
      case "rgb":
        return Color._rgbToHsv(this._r!, this._g!, this._b!);
      default:
        throw new Error("Invalid color space");
    }
  }

  private _getHWB(): [number, number, number] {
    switch (this._space) {
      case "cmyk":
        return Color._cmykToHwb(this._c!, this._m!, this._y!, this._k!);
      case "hsl":
        return Color._hslToHwb(this._h!, this._s!, this._l!);
      case "hsv":
        return Color._hsvToHwb(this._h!, this._s!, this._v!);
      case "hwb":
        return [this._h!, this._w!, this._k!];
      case "rgb":
        return Color._rgbToHwb(this._r!, this._g!, this._b!);
      default:
        throw new Error("Invalid color space");
    }
  }

  private _getRGB(): [number, number, number] {
    switch (this._space) {
      case "cmyk":
        return Color._cmykToRgb(this._c!, this._m!, this._y!, this._k!);
      case "hsl":
        return Color._hslToRgb(this._h!, this._s!, this._l!);
      case "hsv":
        return Color._hsvToRgb(this._h!, this._s!, this._v!);
      case "hwb":
        return Color._hwbToRgb(this._h!, this._w!, this._k!);
      case "rgb":
        return [this._r!, this._g!, this._b!];
      default:
        throw new Error("Invalid color space");
    }
  }
  private _parse(color: string) {
    if (color.startsWith("#")) {
      this._space = "rgb";
      this._parseHex(color);
      return;
    }

    if (color.startsWith("cmyk")) {
      this._space = "cmyk";
      this._parseCMYK(color);
      return;
    }

    if (color.startsWith("hsl")) {
      this._space = "hsl";
      this._parseHSL(color);
      return;
    }

    if (color.startsWith("hsv")) {
      this._space = "hsv";
      this._parseHSV(color);
      return;
    }

    if (color.startsWith("hwb")) {
      this._space = "hwb";
      this._parseHWB(color);
      return;
    }

    if (color.startsWith("rgb")) {
      this._space = "rgb";
      this._parseRGB(color);
      return;
    }

    throw new Error("Not implemented");
  }

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

  private _parseHexShort(color: string) {
    const r = parseInt(color[1], 16);
    const g = parseInt(color[2], 16);
    const b = parseInt(color[3], 16);

    this._r = r * 17;
    this._g = g * 17;
    this._b = b * 17;
  }

  private _parseHexLong(color: string) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    this._r = r;
    this._g = g;
    this._b = b;
  }

  private _parseCMYK(color: string) {
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

  private _parseHSL(color: string) {
    const match = color.match(/^hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)$/);

    if (match) {
      this._h = parseInt(match[1], 10);
      this._s = parseInt(match[2], 10) / 100;
      this._l = parseInt(match[3], 10) / 100;
      return;
    }

    throw new Error("Invalid color");
  }

  private _parseHSV(color: string) {
    const match = color.match(/^hsv\((\d+),\s*(\d+)%?,\s*(\d+)%?\)$/);

    if (match) {
      this._h = parseInt(match[1], 10);
      this._s = parseInt(match[2], 10) / 100;
      this._v = parseInt(match[3], 10) / 100;
      return;
    }

    throw new Error("Invalid color");
  }

  private _parseHWB(color: string) {
    const match = color.match(/^hwb\((\d+),\s*(\d+)%?,\s*(\d+)%?\)$/);

    if (match) {
      this._h = parseInt(match[1], 10);
      this._w = parseInt(match[2], 10) / 100;
      this._k = parseInt(match[3], 10) / 100;
      return;
    }

    throw new Error("Invalid color");
  }

  private _parseRGB(color: string) {
    const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (match) {
      this._r = parseInt(match[1], 10);
      this._g = parseInt(match[2], 10);
      this._b = parseInt(match[3], 10);
      return;
    }

    throw new Error("Invalid color");
  }

  private static _cmykToHsl(
    c: number,
    m: number,
    y: number,
    k: number
  ): [number, number, number] {
    const [r, g, b] = Color._cmykToRgb(c, m, y, k);
    return Color._rgbToHsl(r, g, b);
  }

  private static _cmykToHsv(
    c: number,
    m: number,
    y: number,
    k: number
  ): [number, number, number] {
    const [r, g, b] = Color._cmykToRgb(c, m, y, k);

    return Color._rgbToHsv(r, g, b);
  }

  private static _cmykToHwb(
    c: number,
    m: number,
    y: number,
    k: number
  ): [number, number, number] {
    const [r, g, b] = Color._cmykToRgb(c, m, y, k);

    return Color._rgbToHwb(r, g, b);
  }

  private static _cmykToRgb(
    c: number,
    m: number,
    y: number,
    k: number
  ): [number, number, number] {
    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);

    return [Math.round(r), Math.round(g), Math.round(b)];
  }

  private static _hslToCmyk(
    h: number,
    s: number,
    l: number
  ): [number, number, number, number] {
    const [r, g, b] = Color._hslToRgb(h, s, l);

    return Color._rgbToCmyk(r, g, b);
  }

  private static _hsvToCmyk(
    h: number,
    s: number,
    l: number
  ): [number, number, number, number] {
    const [r, g, b] = Color._hsvToRgb(h, s, l);

    return Color._rgbToCmyk(r, g, b);
  }

  private static _hslToHsv(
    h: number,
    s: number,
    l: number
  ): [number, number, number] {
    const v = l + s * Math.min(l, 1 - l);
    const s2 = v === 0 ? 0 : 2 - (2 * l) / v;

    return [h, Math.round(s2 * 100) / 100, Math.round(v * 100) / 100];
  }

  private static _hslToHwb(
    h: number,
    s: number,
    l: number
  ): [number, number, number] {
    const w = l * (1 - s);
    const b = 1 - s;

    return [h, w, b];
  }

  private static _hslToRgb(
    h: number,
    s: number,
    l: number
  ): [number, number, number] {
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

    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255),
    ];
  }

  private static _hsvToHsl(
    h: number,
    s: number,
    v: number
  ): [number, number, number] {
    const l = v - (v * s) / 2;
    const s2 = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);

    return [h, Math.round(s2 * 100) / 100, Math.round(l * 100) / 100];
  }

  private static _hsvToHwb(
    h: number,
    s: number,
    v: number
  ): [number, number, number] {
    const w = v * (1 - s);
    const b = 1 - s;

    return [h, w, b];
  }

  private static _hsvToRgb(
    h: number,
    s: number,
    v: number
  ): [number, number, number] {
    const [h2, s2, l] = Color._hsvToHsl(h, s, v);
    return Color._hslToRgb(h2, s2, l);
  }

  private static _hwbToCmyk(
    h: number,
    w: number,
    b: number
  ): [number, number, number, number] {
    const [h2, s, l] = Color._hwbToHsl(h, w, b);
    return Color._hslToCmyk(h2, s, l);
  }

  private static _hwbToHsl(
    h: number,
    w: number,
    b: number
  ): [number, number, number] {
    const s = 1 - w / (1 - b);
    const l = 1 - b;

    return [h, s, l];
  }

  private static _hwbToHsv(
    h: number,
    w: number,
    b: number
  ): [number, number, number] {
    const [h2, s, l] = Color._hwbToHsl(h, w, b);
    return Color._hslToHsv(h2, s, l);
  }

  private static _hwbToRgb(
    h: number,
    w: number,
    b: number
  ): [number, number, number] {
    throw new Error("Not implemented");
  }

  private static _rgbToCmyk(
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

  private static _rgbToHsl(
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

  private static _rgbToHsv(
    r: number,
    g: number,
    b: number
  ): [number, number, number] {
    const [h, s, l] = Color._rgbToHsl(r, g, b);

    const v = l + s * Math.min(l, 1 - l);
    const s2 = v === 0 ? 0 : 2 - (2 * l) / v;

    return [h, Math.round(s2 * 100) / 100, Math.round(v * 100) / 100];
  }

  private static _rgbToHwb(
    r: number,
    g: number,
    b: number
  ): [number, number, number] {
    const [h, s, l] = Color._rgbToHsl(r, g, b);

    const w = l * (1 - s);
    const b2 = 1 - s;

    return [h, w, b2];
  }
}
