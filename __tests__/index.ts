import Color from "../src/index";

describe("adjust()", () => {
  it("should adjust the color by the given amount (RGB)", () => {
    const c = Color({ r: 255, g: 0, b: 0 });
    expect(c.adjust({ red: -30 }).array).toEqual([225, 0, 0]);
    expect(c.adjust({ red: -100, green: 255 }).array).toEqual([155, 255, 0]);
    expect(c.adjust({ red: 255, green: -100, blue: 10 }).array).toEqual([
      255, 0, 10,
    ]);
  });

  it("should throw an error when invalid RGB values are used", () => {
    const c = Color({ r: 255, g: 0, b: 0 });
    expect(() => c.adjust({ red: 256 })).toThrow();
    expect(() => c.adjust({ blue: -256 })).toThrow();
  });

  it("should adjust the color by the given amount (HSL)", () => {
    const c = Color({ h: 0, s: 1, l: 0.5 });
    expect(c.adjust({ hue: -30 }).array).toEqual([330, 1, 0.5]);
    expect(c.adjust({ hue: -100, saturation: 0.5 }).array).toEqual([
      260, 1, 0.5,
    ]);
    expect(
      c.adjust({ hue: 100, saturation: -0.5, lightness: 0.1 }).array
    ).toEqual([100, 0.5, 0.6]);
  });

  it("should throw an error when invalid HSL values are used", () => {
    const c = Color({ h: 0, s: 1, l: 0.5 });
    expect(() => c.adjust({ saturation: -1.1 })).toThrow();
    expect(() => c.adjust({ lightness: 1.1 })).toThrow();
  });

  it("should adjust the color by the given amount (HWB)", () => {
    const c = Color({ h: 0, w: 0, b: 0 });
    expect(c.adjust({ hue: -30 }).array).toEqual([330, 0, 0]);
    expect(c.adjust({ hue: -100, whiteness: 0.5 }).array).toEqual([
      260, 0.5, 0,
    ]);
    expect(
      c.adjust({ hue: 100, whiteness: -0.5, blackness: 0.1 }).array
    ).toEqual([100, 0, 0.1]);
  });

  it("should throw an error when invalid HWB values are used", () => {
    const c = Color({ h: 0, w: 0, b: 0 });
    expect(() => c.adjust({ whiteness: -1.1 })).toThrow();
    expect(() => c.adjust({ blackness: 1.1 })).toThrow();
  });
});

describe("change()", () => {
  it("should change the color to the given amount (RGB)", () => {
    const c = Color({ r: 255, g: 0, b: 0 });
    expect(c.change({ red: 100 }).array).toEqual([100, 0, 0]);
    expect(c.change({ red: 100, green: 255 }).array).toEqual([100, 255, 0]);
    expect(c.change({ red: 255, green: 100, blue: 10 }).array).toEqual([
      255, 100, 10,
    ]);
  });

  it("should throw an error when invalid RGB values are used", () => {
    const c = Color({ r: 255, g: 0, b: 0 });
    expect(() => c.change({ red: 256 })).toThrow();
    expect(() => c.change({ blue: -256 })).toThrow();
  });

  it("should change the color to the given amount (HSL)", () => {
    const c = Color({ h: 0, s: 1, l: 0.5 });
    expect(c.change({ hue: 100 }).array).toEqual([100, 1, 0.5]);
    expect(c.change({ hue: 100, saturation: 0.5 }).array).toEqual([
      100, 0.5, 0.5,
    ]);
    expect(
      c.change({ hue: 100, saturation: 0.5, lightness: 0.1 }).array
    ).toEqual([100, 0.5, 0.1]);
  });

  it("should throw an error when invalid HSL values are used", () => {
    const c = Color({ h: 0, s: 1, l: 0.5 });
    expect(() => c.change({ saturation: -1.1 })).toThrow();
    expect(() => c.change({ lightness: 1.1 })).toThrow();
  });

  it("should change the color to the given amount (HWB)", () => {
    const c = Color({ h: 0, w: 0, b: 0 });
    expect(c.change({ hue: 100 }).array).toEqual([100, 0, 0]);
    expect(c.change({ hue: 100, whiteness: 0.5 }).array).toEqual([100, 0.5, 0]);
  });
});

describe("get complement()", () => {
  it("should return the complement of the color", () => {
    expect(Color({ r: 255, g: 0, b: 0 }).complement.array).toEqual([
      0, 255, 255,
    ]);
    expect(Color({ r: 0, g: 255, b: 0 }).complement.array).toEqual([
      255, 0, 255,
    ]);
    expect(Color({ r: 0, g: 0, b: 255 }).complement.array).toEqual([
      255, 255, 0,
    ]);
    expect(Color({ h: 0, s: 1, l: 0.5 }).complement.array).toEqual([
      180, 1, 0.5,
    ]);
    expect(Color({ h: 180, s: 1, l: 0.5 }).complement.array).toEqual([
      0, 1, 0.5,
    ]);
    expect(Color({ h: 60, s: 0.5, l: 1 }).complement.array).toEqual([
      240, 0.5, 1,
    ]);
  });
});
