import Color from "./index";
import { colors } from "./fixtures";

describe("constructor()", () => {
  test("using valid Hex string to initialize", () => {
    for (const color of colors) {
      const { string } = new Color(color.hex);
      expect(string).toBe(color.rgbString);
    }
  });

  test("using valid CMYK object to initialize", () => {
    for (const color of colors) {
      const { string } = new Color({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      });
      expect(string).toBe(color.cmykString);
    }
  });

  test("using valid CMYK string to initialize", () => {
    for (const color of colors) {
      const { string } = new Color(color.cmykString);
      expect(string).toBe(color.cmykString);
    }
  });

  test("using valid HSL object to initialize", () => {
    for (const color of colors) {
      const { string } = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      });
      expect(string).toBe(color.hslString);
    }
  });

  test("using valid HSL string to initialize", () => {
    for (const color of colors) {
      const { string } = new Color(color.hslString);
      expect(string).toBe(color.hslString);
    }
  });

  test("using valid HSV object to initialize", () => {
    for (const color of colors) {
      const { string } = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      });
      expect(string).toBe(color.hsvString);
    }
  });

  test("using valid HSV string to initialize", () => {
    for (const color of colors) {
      const { string } = new Color(color.hsvString);
      expect(string).toBe(color.hsvString);
    }
  });

  test("using valid HWB object to initialize", () => {
    for (const color of colors) {
      const { string } = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      });
      expect(string).toBe(color.hwbString);
    }
  });

  test("using valid HWB string to initialize", () => {
    for (const color of colors) {
      const { string } = new Color(color.hwbString);
      expect(string).toBe(color.hwbString);
    }
  });

  test("using valid RGB object to initialize", () => {
    for (const color of colors) {
      const { string } = new Color({
        r: color.rgb[0],
        g: color.rgb[1],
        b: color.rgb[2],
      });
      expect(string).toBe(color.rgbString);
    }
  });

  test("using valid RGB string to initialize", () => {
    for (const color of colors) {
      const { string } = new Color(color.rgbString);
      expect(string).toBe(color.rgbString);
    }
  });
});

describe("cmyk() method", () => {
  test("returns the correct CMYK value for CMYK colors", () => {
    for (const color of colors) {
      const cmyk = new Color({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      }).cmyk();

      expect(cmyk.string).toEqual(color.cmykString);
    }
  });

  test("returns the correct CMYK value for HSL colors", () => {
    for (const color of colors) {
      const cmyk = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      }).cmyk();

      expect(cmyk.string).toEqual(color.cmykString);
    }
  });

  test("returns the correct CMYK value for HSV colors", () => {
    for (const color of colors) {
      const cmyk = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      }).cmyk();

      expect(cmyk.string).toEqual(color.cmykString);
    }
  });

  test("returns the correct CMYK value for HWB colors", () => {
    for (const color of colors) {
      const cmyk = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      }).cmyk();

      expect(cmyk.string).toEqual(color.cmykString);
    }
  });

  test("returns the correct CMYK value for RGB colors", () => {
    for (const color of colors) {
      const cmyk = new Color({
        r: color.rgb[0],
        g: color.rgb[1],
        b: color.rgb[2],
      }).cmyk();

      expect(cmyk.string).toEqual(color.cmykString);
    }
  });
});

describe("hsl() method", () => {
  test("returns the correct HSL value for CMYK colors", () => {
    for (const color of colors) {
      const hsl = new Color({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      }).hsl();

      expect(hsl.array).toEqual(color.cmykToHsl ? color.cmykToHsl : color.hsl);
    }
  });

  test("returns the correct HSL value for HSL colors", () => {
    for (const color of colors) {
      const hsl = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      }).hsl();

      expect(hsl.string).toEqual(color.hslString);
    }
  });

  test("returns the correct HSL value for HSV colors", () => {
    for (const color of colors) {
      const hsl = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      }).hsl();

      expect(hsl.array).toEqual(color.hsvToHsl ? color.hsvToHsl : color.hsl);
    }
  });

  test("returns the correct HSL value for HWB colors", () => {
    for (const color of colors) {
      const hsl = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      }).hsl();

      expect(hsl.string).toEqual(color.hslString);
    }
  });

  test("returns the correct HSL value for RGB colors", () => {
    for (const color of colors) {
      const hsl = new Color({
        r: color.rgb[0],
        g: color.rgb[1],
        b: color.rgb[2],
      }).hsl();

      expect(hsl.string).toEqual(color.hslString);
    }
  });
});

describe("hsv() method", () => {
  test("returns the correct HSV value for CMYK colors", () => {
    for (const color of colors) {
      const hsv = new Color({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      }).hsv();

      expect(hsv.array).toEqual(color.cmykToHsv ? color.cmykToHsv : color.hsv);
    }
  });

  test("returns the correct HSV value for HSL colors", () => {
    for (const color of colors) {
      const hsv = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      }).hsv();

      expect(hsv.string).toEqual(color.hsvString);
    }
  });

  test("returns the correct HSV value for HSV colors", () => {
    for (const color of colors) {
      const hsv = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      }).hsv();

      expect(hsv.string).toEqual(color.hsvString);
    }
  });

  test("returns the correct HSV value for HWB colors", () => {
    for (const color of colors) {
      const hsv = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      }).hsv();

      expect(hsv.string).toEqual(color.hsvString);
    }
  });

  test("returns the correct HSV value for RGB colors", () => {
    for (const color of colors) {
      const hsv = new Color({
        r: color.rgb[0],
        g: color.rgb[1],
        b: color.rgb[2],
      }).hsv();

      expect(hsv.string).toEqual(color.hsvString);
    }
  });
});

describe("hwb() method", () => {
  test("returns the correct HWB value for CMYK colors", () => {
    for (const color of colors) {
      const hwb = new Color({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      }).hwb();

      expect(hwb.string).toEqual(color.hwbString);
    }
  });

  test("returns the correct HWB value for HSL colors", () => {
    for (const color of colors) {
      const hwb = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      }).hwb();

      expect(hwb.string).toEqual(color.hwbString);
    }
  });

  test("returns the correct HWB value for HSV colors", () => {
    for (const color of colors) {
      const hwb = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      }).hwb();

      expect(hwb.string).toEqual(color.hwbString);
    }
  });

  test("returns the correct HWB value for HWB colors", () => {
    for (const color of colors) {
      const hwb = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      }).hwb();

      expect(hwb.string).toEqual(color.hwbString);
    }
  });

  test("returns the correct HWB value for RGB colors", () => {
    for (const color of colors) {
      const hwb = new Color({
        r: color.rgb[0],
        g: color.rgb[1],
        b: color.rgb[2],
      }).hwb();

      expect(hwb.string).toEqual(color.hwbString);
    }
  });
});

describe("rgb() method", () => {
  test("returns the correct RGB value for CMYK colors", () => {
    for (const color of colors) {
      const rgb = new Color({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      }).rgb();

      expect(rgb.array).toEqual(color.cmykToRgb ? color.cmykToRgb : color.rgb);
    }
  });

  test("returns the correct RGB value for HSL colors", () => {
    for (const color of colors) {
      const rgb = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      }).rgb();

      expect(rgb.array).toEqual(color.hslToRgb ? color.hslToRgb : color.rgb);
    }
  });

  test("returns the correct RGB value for HSV colors", () => {
    for (const color of colors) {
      const rgb = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      }).rgb();

      expect(rgb.array).toEqual(color.hsvToRgb ? color.hsvToRgb : color.rgb);
    }
  });

  test("returns the correct RGB value for HWB colors", () => {
    for (const color of colors) {
      const rgb = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      }).rgb();

      expect(rgb.string).toEqual(color.rgbString);
    }
  });

  test("returns the correct RGB value for RGB colors", () => {
    for (const color of colors) {
      const rgb = new Color({
        r: color.rgb[0],
        g: color.rgb[1],
        b: color.rgb[2],
      }).rgb();

      expect(rgb.string).toEqual(color.rgbString);
    }
  });
});

describe("hex property", () => {
  test("returns the correct hex value for CMYK colors", () => {
    for (const color of colors) {
      const { hex } = new Color({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      });
      expect(hex).toBe(color.cmykHex ? color.cmykHex : color.hex);
    }
  });

  test("returns the correct hex value for HSL colors", () => {
    for (const color of colors) {
      const { hex } = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      });
      expect(hex).toBe(color.hslHex ? color.hslHex : color.hex);
    }
  });

  test("returns the correct hex value for HSV colors", () => {
    for (const color of colors) {
      const { hex } = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      });
      expect(hex).toBe(color.hsvHex ? color.hsvHex : color.hex);
    }
  });

  test("returns the correct hex value for HWB colors", () => {
    for (const color of colors) {
      const { hex } = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      });
      expect(hex).toBe(color.hex);
    }
  });

  test("returns the correct hex value for RGB colors", () => {
    for (const color of colors) {
      const { hex } = new Color({
        r: color.rgb[0],
        g: color.rgb[1],
        b: color.rgb[2],
      });
      expect(hex).toBe(color.hex);
    }
  });
});

describe("array", () => {
  test("returns the correct array value for CMYK colors", () => {
    for (const color of colors) {
      const { array } = new Color({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      });
      expect(array).toEqual(color.cmyk);
    }
  });

  test("returns the correct array value for HSL colors", () => {
    for (const color of colors) {
      const { array } = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      });
      expect(array).toEqual(color.hsl);
    }
  });

  test("returns the correct array value for HSV colors", () => {
    for (const color of colors) {
      const { array } = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      });
      expect(array).toEqual(color.hsv);
    }
  });

  test("returns the correct array value for HWB colors", () => {
    for (const color of colors) {
      const { array } = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      });
      expect(array).toEqual(color.hwb);
    }
  });

  test("returns the correct array value for RGB colors", () => {
    for (const color of colors) {
      const { array } = new Color({
        r: color.rgb[0],
        g: color.rgb[1],
        b: color.rgb[2],
      });
      expect(array).toEqual(color.rgb);
    }
  });
});

describe("object", () => {
  test("returns the correct object value for CMYK colors", () => {
    for (const color of colors) {
      const { object } = new Color({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      });
      expect(object).toEqual({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      });
    }
  });

  test("returns the correct object value for HSL colors", () => {
    for (const color of colors) {
      const { object } = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      });
      expect(object).toEqual({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      });
    }
  });

  test("returns the correct object value for HSV colors", () => {
    for (const color of colors) {
      const { object } = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      });
      expect(object).toEqual({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      });
    }
  });

  test("returns the correct object value for HWB colors", () => {
    for (const color of colors) {
      const { object } = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      });
      expect(object).toEqual({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      });
    }
  });

  test("returns the correct object value for RGB colors", () => {
    for (const color of colors) {
      const { object } = new Color({
        r: color.rgb[0],
        g: color.rgb[1],
        b: color.rgb[2],
      });
      expect(object).toEqual({
        r: color.rgb[0],
        g: color.rgb[1],
        b: color.rgb[2],
      });
    }
  });
});

describe("string", () => {
  test("returns the correct string value for CMYK colors", () => {
    for (const color of colors) {
      const { string } = new Color({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      });
      expect(string).toBe(color.cmykString);
    }
  });

  test("returns the correct string value for HSL colors", () => {
    for (const color of colors) {
      const { string } = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      });
      expect(string).toBe(color.hslString);
    }
  });

  test("returns the correct string value for HSV colors", () => {
    for (const color of colors) {
      const { string } = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      });
      expect(string).toBe(color.hsvString);
    }
  });

  test("returns the correct string value for HWB colors", () => {
    for (const color of colors) {
      const { string } = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      });
      expect(string).toBe(color.hwbString);
    }
  });

  test("returns the correct string value for RGB colors", () => {
    for (const color of colors) {
      const { string } = new Color({
        r: color.rgb[0],
        g: color.rgb[1],
        b: color.rgb[2],
      });
      expect(string).toBe(color.rgbString);
    }
  });
});
