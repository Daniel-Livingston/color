import Color from "../src/hsl";

describe("constructor()", () => {
  it("should parse an HSL string", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      expect(c.hue).toBe(color.hsl[0]);
      expect(c.saturation).toBe(color.hsl[1]);
      expect(c.lightness).toBe(color.hsl[2]);
    });
  });

  it("should parse an HSL object", () => {
    colors.forEach((color) => {
      const c = new Color({
        hue: color.hsl[0],
        saturation: color.hsl[1],
        lightness: color.hsl[2],
      });
      expect(c.hue).toBe(color.hsl[0]);
      expect(c.saturation).toBe(color.hsl[1]);
      expect(c.lightness).toBe(color.hsl[2]);
    });
  });

  it("should throw an error for an invalid HSL string", () => {
    expect(() => {
      new Color("hsl(0, 100%, 50)");
    }).toThrow();
  });
});

describe("get array()", () => {
  it("should return an array of HSL values", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      expect(c.array).toEqual(color.hsl);
    });
  });
});

describe("get object()", () => {
  it("should return an object of HSL values", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      expect(c.object).toEqual({
        hue: color.hsl[0],
        saturation: color.hsl[1],
        lightness: color.hsl[2],
      });
    });
  });
});

describe("get string()", () => {
  it("should return an HSL string", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      expect(c.string).toBe(color.string);
    });
  });
});

describe("cmyk()", () => {
  it("should return a CMYK color that matches the HSL color", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      const cmyk = c.cmyk();
      expect(cmyk.cyan).toBe(color.cmyk[0]);
      expect(cmyk.magenta).toBe(color.cmyk[1]);
      expect(cmyk.yellow).toBe(color.cmyk[2]);
      expect(cmyk.blackness).toBe(color.cmyk[3]);
    });
  });
});

describe("hsl()", () => {
  it("should return an HSL color that matches the HSL color", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      const hsl = c.hsl();
      expect(hsl.hue).toBe(color.hsl[0]);
      expect(hsl.saturation).toBe(color.hsl[1]);
      expect(hsl.lightness).toBe(color.hsl[2]);
    });
  });
});

describe("hsv()", () => {
  it("should return an HSV color that matches the HSL color", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      const hsv = c.hsv();
      expect(hsv.hue).toBe(color.hsv[0]);
      expect(hsv.saturation).toBe(color.hsv[1]);
      expect(hsv.brightness).toBe(color.hsv[2]);
    });
  });
});

describe("hwb()", () => {
  it("should return an HWB color that matches the HSL color", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      const hwb = c.hwb();
      expect(hwb.hue).toBe(color.hwb[0]);
      expect(hwb.whiteness).toBe(color.hwb[1]);
      expect(hwb.blackness).toBe(color.hwb[2]);
    });
  });
});

describe("rgb()", () => {
  it("should return an RGB color that matches the HSL color", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      const rgb = c.rgb();
      expect(rgb.red).toBe(color.rgb[0]);
      expect(rgb.green).toBe(color.rgb[1]);
      expect(rgb.blue).toBe(color.rgb[2]);
      expect(rgb.hue).toBe(color.hsl[0]);
      expect(rgb.saturation).toBe(color.hsl[1]);
      expect(rgb.lightness).toBe(color.hsl[2]);
    });
  });
});

const colors = [
  {
    hsl: [0, 1, 0.5],
    hsv: [0, 1, 1],
    hex: "#ff0000",
    hwb: [0, 0, 0],
    rgb: [255, 0, 0],
    cmyk: [0, 1, 1, 0],
    string: "hsl(0, 100%, 50%)",
  },
  {
    hsl: [120, 1, 0.5],
    hsv: [120, 1, 1],
    hwb: [120, 0, 0],
    hex: "#00ff00",
    rgb: [0, 255, 0],
    cmyk: [1, 0, 1, 0],
    string: "hsl(120, 100%, 50%)",
  },
  {
    hsl: [240, 1, 0.5],
    hsv: [240, 1, 1],
    hwb: [240, 0, 0],
    hex: "#0000ff",
    rgb: [0, 0, 255],
    cmyk: [1, 1, 0, 0],
    string: "hsl(240, 100%, 50%)",
  },
  {
    hsl: [0, 0, 1],
    hsv: [0, 0, 1],
    hwb: [0, 1, 0],
    hex: "#ffffff",
    rgb: [255, 255, 255],
    cmyk: [0, 0, 0, 0],
    string: "hsl(0, 0%, 100%)",
  },
  {
    hsl: [0, 0, 0],
    hsv: [0, 0, 0],
    hwb: [0, 0, 1],
    hex: "#000000",
    rgb: [0, 0, 0],
    cmyk: [0, 0, 0, 1],
    string: "hsl(0, 0%, 0%)",
  },
];
