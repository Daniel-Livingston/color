import Color from "../src/index";

describe("adjust()", () => {
  it("should adjust the color by the given amount (RGB)", () => {
    const c = Color({ red: 255, green: 0, blue: 0 });
    expect(c.adjust({ red: -30 }).array).toEqual([225, 0, 0]);
    expect(c.adjust({ red: -100, green: 255 }).array).toEqual([155, 255, 0]);
    expect(c.adjust({ red: 255, green: -100, blue: 10 }).array).toEqual([
      255, 0, 10,
    ]);
  });

  it("should throw an error when invalid RGB values are used", () => {
    const c = Color({ red: 255, green: 0, blue: 0 });
    expect(() => c.adjust({ red: 256 })).toThrow();
    expect(() => c.adjust({ blue: -256 })).toThrow();
  });

  it("should adjust the color by the given amount (HSL)", () => {
    const c = Color({ hue: 0, saturation: 1, lightness: 0.5 });
    expect(c.adjust({ hue: -30 }).array).toEqual([330, 1, 0.5]);
    expect(c.adjust({ hue: -100, saturation: 0.5 }).array).toEqual([
      260, 1, 0.5,
    ]);
    expect(
      c.adjust({ hue: 100, saturation: -0.5, lightness: 0.1 }).array
    ).toEqual([100, 0.5, 0.6]);
  });

  it("should throw an error when invalid HSL values are used", () => {
    const c = Color({ hue: 0, saturation: 1, lightness: 0.5 });
    expect(() => c.adjust({ saturation: -1.1 })).toThrow();
    expect(() => c.adjust({ lightness: 1.1 })).toThrow();
  });

  it("should adjust the color by the given amount (HWB)", () => {
    const c = Color({ hue: 0, whiteness: 0, blackness: 0 });
    expect(c.adjust({ hue: -30 }).array).toEqual([330, 0, 0]);
    expect(c.adjust({ hue: -100, whiteness: 0.5 }).array).toEqual([
      260, 0.5, 0,
    ]);
    expect(
      c.adjust({ hue: 100, whiteness: -0.5, blackness: 0.1 }).array
    ).toEqual([100, 0, 0.1]);
  });

  it("should throw an error when invalid HWB values are used", () => {
    const c = Color({ hue: 0, whiteness: 0, blackness: 0 });
    expect(() => c.adjust({ whiteness: -1.1 })).toThrow();
    expect(() => c.adjust({ blackness: 1.1 })).toThrow();
  });
});

describe("change()", () => {
  it("should change the color to the given amount (RGB)", () => {
    const c = Color({ red: 255, green: 0, blue: 0 });
    expect(c.change({ red: 100 }).array).toEqual([100, 0, 0]);
    expect(c.change({ red: 100, green: 255 }).array).toEqual([100, 255, 0]);
    expect(c.change({ red: 255, green: 100, blue: 10 }).array).toEqual([
      255, 100, 10,
    ]);
    expect(
      Color("#ffffff").change({ red: 0, green: 0, blue: 0 }).array
    ).toEqual([0, 0, 0]);
  });

  it("should throw an error when invalid RGB values are used", () => {
    const c = Color({ red: 255, green: 0, blue: 0 });
    expect(() => c.change({ red: 256 })).toThrow();
    expect(() => c.change({ blue: -256 })).toThrow();
  });

  it("should change the color to the given amount (HSL)", () => {
    const c = Color({ hue: 0, saturation: 1, lightness: 0.5 });
    expect(c.change({ hue: 100 }).array).toEqual([100, 1, 0.5]);
    expect(c.change({ hue: 100, saturation: 0.5 }).array).toEqual([
      100, 0.5, 0.5,
    ]);
    expect(
      c.change({ hue: 100, saturation: 0.5, lightness: 0.1 }).array
    ).toEqual([100, 0.5, 0.1]);
  });

  it("should throw an error when invalid HSL values are used", () => {
    const c = Color({ hue: 0, saturation: 1, lightness: 0.5 });
    expect(() => c.change({ saturation: -1.1 })).toThrow();
    expect(() => c.change({ lightness: 1.1 })).toThrow();
  });

  it("should change the color to the given amount (HWB)", () => {
    const c = Color({ hue: 0, whiteness: 0, blackness: 0 });
    expect(c.change({ hue: 100 }).array).toEqual([100, 0, 0]);
    expect(c.change({ hue: 100, whiteness: 0.5 }).array).toEqual([100, 0.5, 0]);
  });
});

describe("complement()", () => {
  it("should return the complement of the color", () => {
    expect(Color({ red: 255, green: 0, blue: 0 }).complement().array).toEqual([
      0, 255, 255,
    ]);
    expect(Color({ red: 0, green: 255, blue: 0 }).complement().array).toEqual([
      255, 0, 255,
    ]);
    expect(Color({ red: 0, green: 0, blue: 255 }).complement().array).toEqual([
      255, 255, 0,
    ]);
    expect(
      Color({ hue: 0, saturation: 1, lightness: 0.5 }).complement().array
    ).toEqual([180, 1, 0.5]);
    expect(
      Color({ hue: 180, saturation: 1, lightness: 0.5 }).complement().array
    ).toEqual([0, 1, 0.5]);
    expect(
      Color({ hue: 60, saturation: 0.5, lightness: 1 }).complement().array
    ).toEqual([240, 0.5, 1]);
  });
});

describe("grayscale()", () => {
  it("should return the grayscale version of the color", () => {
    expect(
      Color({ hue: 180, saturation: 1, lightness: 0.5 }).grayscale().array
    ).toEqual([0, 0, 0.5]);
    expect(
      Color({ hue: 60, saturation: 0.5, lightness: 1 }).grayscale().array
    ).toEqual([0, 0, 1]);
  });
});

describe("inverse()", () => {
  it("should return the inverse of the color", () => {
    expect(Color({ red: 255, green: 0, blue: 0 }).inverse().array).toEqual([
      0, 255, 255,
    ]);
    expect(Color({ red: 0, green: 255, blue: 0 }).inverse().array).toEqual([
      255, 0, 255,
    ]);
    expect(Color({ red: 0, green: 0, blue: 255 }).inverse().array).toEqual([
      255, 255, 0,
    ]);
    expect(Color("#b37399").inverse().array).toEqual([76, 140, 102]);
  });
});

describe("mix()", () => {
  it("should mix the color with the given color", () => {
    expect(Color("#036").mix(Color("#d2e1dd")).hex).toBe("#698aa2");
    expect(Color("#036").mix(Color("#d2e1dd"), 0.75).hex).toBe("#355f84");
    expect(Color("#036").mix(Color("#d2e1dd"), 0.25).hex).toBe("#9eb6bf");
  });
});

describe("scale()", () => {
  it("should scale the color by the given amount (RGB)", () => {
    expect(Color("#6b717f").scale({ red: 3, blue: 10, green: 5 }).hex).toBe(
      "#ffffff"
    );
    expect(Color("#6b717f").scale({ red: -10, green: -5, blue: -1 }).hex).toBe(
      "#000000"
    );
    expect(
      Color("#6b717f").scale({ red: -0.15, green: 0.8, blue: -0.3 }).hex
    ).toBe("#5be359");
  });

  it("should scale the color by the given amount (HSL)", () => {
    expect(Color("#6b717f").scale({ lightness: 1 }).hex).toBe("#ffffff");
    expect(Color("#6b717f").scale({ lightness: -1 }).hex).toBe("#000000");
    expect(
      Color("#6b717f").scale({ saturation: 0.8, lightness: -0.3 }).hex
    ).toBe("#0f3795");
  });

  it("should scale the color by the given amount (HWB)", () => {
    expect(Color("#6b717f").scale({ whiteness: 1 }).hex).toBe("#aaaaaa");
    expect(Color("#6b717f").scale({ whiteness: -1 }).hex).toBe("#002680");
    expect(Color("#6b717f").scale({ blackness: 1 }).hex).toBe("#4b4b4b");
    expect(Color("#6b717f").scale({ blackness: -1 }).hex).toBe("#6b97ff");
    expect(
      Color("#6b717f").scale({ whiteness: 0.8, blackness: -0.3 }).hex
    ).toBe("#b7b7b7");
  });
});
