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
