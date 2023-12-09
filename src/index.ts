export default class Color {
  constructor() {}

  static cmyk(c: number, m: number, y: number, k: number): Color {
    throw new Error("Not implemented");
  }

  static hsl(h: number, s: number, l: number): Color {
    throw new Error("Not implemented");
  }

  static hsv(h: number, s: number, v: number): Color {
    throw new Error("Not implemented");
  }

  static hwb(h: number, w: number, b: number): Color {
    throw new Error("Not implemented");
  }

  static rgb(r: number, g: number, b: number): Color {
    throw new Error("Not implemented");
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

  array(): number[] {
    throw new Error("Not implemented");
  }

  object(): { [key: string]: number } {
    throw new Error("Not implemented");
  }

  string(): string {
    throw new Error("Not implemented");
  }

  get alpha(): number {
    throw new Error("Not implemented");
  }

  get opacity(): number {
    throw new Error("Not implemented");
  }

  get red(): number {
    throw new Error("Not implemented");
  }

  get green(): number {
    throw new Error("Not implemented");
  }

  get blue(): number {
    throw new Error("Not implemented");
  }

  get hue(): number {
    throw new Error("Not implemented");
  }

  get saturation(): number {
    throw new Error("Not implemented");
  }

  get lightness(): number {
    throw new Error("Not implemented");
  }

  get blackness(): number {
    throw new Error("Not implemented");
  }

  get whiteness(): number {
    throw new Error("Not implemented");
  }

  get hex(): string {
    throw new Error("Not implemented");
  }
}
