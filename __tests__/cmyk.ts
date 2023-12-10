import Color from "../src/cmyk";

describe("constructor()", () => {
  it("should parse a CMYK string", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      expect(c.cyan).toBe(color.cmyk[0]);
      expect(c.magenta).toBe(color.cmyk[1]);
      expect(c.yellow).toBe(color.cmyk[2]);
      expect(c.blackness).toBe(color.cmyk[3]);
    });
  });

  it("should parse a CMYK object", () => {
    colors.forEach((color) => {
      const c = new Color({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      });
      expect(c.cyan).toBe(color.cmyk[0]);
      expect(c.magenta).toBe(color.cmyk[1]);
      expect(c.yellow).toBe(color.cmyk[2]);
      expect(c.blackness).toBe(color.cmyk[3]);
    });
  });
});

describe("get array()", () => {
  it("should return an array of CMYK values", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      expect(c.array).toEqual(color.cmyk);
    });
  });
});

describe("get object()", () => {
  it("should return an object of CMYK values", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      expect(c.object).toEqual({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      });
    });
  });
});

describe("get string()", () => {
  it("should return a CMYK string", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      expect(c.string).toBe(color.string);
    });
  });
});

describe("cmyk()", () => {
  it("should return a CMYK color that matches the CMYK color", () => {
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
  it("should return an HSL color that matches the CMYK color", () => {
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
  it("should return an HSV color that matches the CMYK color", () => {
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
  it("should return an HWB color that matches the CMYK color", () => {
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
  it("should return an RGB color that matches the CMYK color", () => {
    colors.forEach((color) => {
      const c = new Color(color.string);
      const rgb = c.rgb();
      expect(rgb.red).toBe(color.rgb[0]);
      expect(rgb.green).toBe(color.rgb[1]);
      expect(rgb.blue).toBe(color.rgb[2]);
    });
  });
});

describe("adjust()", () => {
  it("should adjust the CMYK color when the RGB values are updated", () => {
    const c = new Color("cmyk(16%, 11%, 0%, 50%)");
    const adjusted = c.adjust({ red: 250, green: 20, blue: -30 });
    expect(adjusted.cyan).toBe(0);
    expect(adjusted.magenta).toBe(0.48);
    expect(adjusted.yellow).toBe(0.62);
    expect(adjusted.blackness).toBe(0);
  });

  it("should throw an error when invalid RGB values are used", () => {
    const c = new Color("cmyk(16%, 11%, 0%, 50%)");
    expect(() => c.adjust({ red: 256 })).toThrow();
    expect(() => c.adjust({ blue: -256 })).toThrow();
  });

  it("should adjust the CMYK color when the HSL values are updated", () => {
    const c = new Color("cmyk(16%, 11%, 0%, 50%)");
    const adjusted = c.adjust({ hue: 60, saturation: 0.5, lightness: -0.3 });
    expect(adjusted.cyan).toBe(0.22);
    expect(adjusted.magenta).toBe(0.74);
    expect(adjusted.yellow).toBe(0);
    expect(adjusted.blackness).toBe(0.75);
  });

  it("should throw an error when invalid HSL values are used", () => {
    const c = new Color("cmyk(16%, 11%, 0%, 50%)");
    expect(() => c.adjust({ saturation: -1.1 })).toThrow();
    expect(() => c.adjust({ lightness: 1.1 })).toThrow();
  });
});

const colors = [
  {
    cmyk: [0, 1, 1, 0],
    hsl: [0, 1, 0.5],
    hsv: [0, 1, 1],
    hwb: [0, 0, 0],
    hex: "#ff0000",
    rgb: [255, 0, 0],
    string: "cmyk(0%, 100%, 100%, 0%)",
  },
  {
    cmyk: [1, 0, 1, 0],
    hsl: [120, 1, 0.5],
    hsv: [120, 1, 1],
    hwb: [120, 0, 0],
    hex: "#00ff00",
    rgb: [0, 255, 0],
    string: "cmyk(100%, 0%, 100%, 0%)",
  },
  {
    cmyk: [1, 1, 0, 0],
    hsl: [240, 1, 0.5],
    hsv: [240, 1, 1],
    hwb: [240, 0, 0],
    hex: "#0000ff",
    rgb: [0, 0, 255],
    string: "cmyk(100%, 100%, 0%, 0%)",
  },
  {
    cmyk: [0, 0, 0, 0],
    hsl: [0, 0, 1],
    hsv: [0, 0, 1],
    hwb: [0, 1, 0],
    hex: "#ffffff",
    rgb: [255, 255, 255],
    string: "cmyk(0%, 0%, 0%, 0%)",
  },
  {
    cmyk: [0, 0, 0, 1],
    hsl: [0, 0, 0],
    hsv: [0, 0, 0],
    hwb: [0, 0, 1],
    hex: "#000000",
    rgb: [0, 0, 0],
    string: "cmyk(0%, 0%, 0%, 100%)",
  },
];
