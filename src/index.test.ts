import Color from "./index";
import { colors } from "./fixtures";

describe("cmyk", () => {
  test("returns the correct CMYK value for colors in the CMYK color space", () => {
    for (const color of colors) {
      const cmyk = new Color({
        c: color.cmyk[0],
        m: color.cmyk[1],
        y: color.cmyk[2],
        k: color.cmyk[3],
      }).cmyk();

      expect(cmyk.hex).toEqual(color.cmykHex ? color.cmykHex : color.hex);
    }
  });

  test("returns the correct CMYK value for colors in the HSL color space", () => {
    for (const color of colors) {
      const cmyk = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      }).cmyk();

      expect(cmyk.hex).toEqual(color.cmykHex ? color.cmykHex : color.hex);
    }
  });

  test("returns the correct CMYK value for colors in the HSV color space", () => {
    for (const color of colors) {
      const cmyk = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      }).cmyk();

      expect(cmyk.hex).toEqual(color.cmykHex ? color.cmykHex : color.hex);
    }
  });

  test("returns the correct CMYK value for colors in the HWB color space", () => {
    for (const color of colors) {
      const cmyk = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      }).cmyk();

      expect(cmyk.hex).toEqual(color.cmykHex ? color.cmykHex : color.hex);
    }
  });

  test("returns the correct CMYK value for colors in the RGB color space", () => {
    for (const color of colors) {
      const cmyk = new Color({
        r: color.rgb[0],
        g: color.rgb[1],
        b: color.rgb[2],
      }).cmyk();

      expect(cmyk.hex).toEqual(color.cmykHex ? color.cmykHex : color.hex);
    }
  });
});

describe("hex", () => {
  test("returns the correct hex value for colors in the CMYK color space", () => {
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

  test("returns the correct hex value for colors in the HSL color space", () => {
    for (const color of colors) {
      const { hex } = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      });
      expect(hex).toBe(color.hslHex ? color.hslHex : color.hex);
    }
  });

  test("returns the correct hex value for colors in the HSV color space", () => {
    for (const color of colors) {
      const { hex } = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      });
      expect(hex).toBe(color.hex);
    }
  });

  test("returns the correct hex value for colors in the HWB color space", () => {
    for (const color of colors) {
      const { hex } = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      });
      expect(hex).toBe(color.hex);
    }
  });

  test("returns the correct hex value for colors in the RGB color space", () => {
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
  test("returns the correct array value for colors in the CMYK color space", () => {
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

  test("returns the correct array value for colors in the HSL color space", () => {
    for (const color of colors) {
      const { array } = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      });
      expect(array).toEqual(color.hsl);
    }
  });

  test("returns the correct array value for colors in the HSV color space", () => {
    for (const color of colors) {
      const { array } = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      });
      expect(array).toEqual(color.hsv);
    }
  });

  test("returns the correct array value for colors in the HWB color space", () => {
    for (const color of colors) {
      const { array } = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      });
      expect(array).toEqual(color.hwb);
    }
  });

  test("returns the correct array value for colors in the RGB color space", () => {
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
  test("returns the correct object value for colors in the CMYK color space", () => {
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

  test("returns the correct object value for colors in the HSL color space", () => {
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

  test("returns the correct object value for colors in the HSV color space", () => {
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

  test("returns the correct object value for colors in the HWB color space", () => {
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

  test("returns the correct object value for colors in the RGB color space", () => {
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
  test("returns the correct string value for colors in the CMYK color space", () => {
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

  test("returns the correct string value for colors in the HSL color space", () => {
    for (const color of colors) {
      const { string } = new Color({
        h: color.hsl[0],
        s: color.hsl[1],
        l: color.hsl[2],
      });
      expect(string).toBe(color.hslString);
    }
  });

  test("returns the correct string value for colors in the HSV color space", () => {
    for (const color of colors) {
      const { string } = new Color({
        h: color.hsv[0],
        s: color.hsv[1],
        v: color.hsv[2],
      });
      expect(string).toBe(color.hsvString);
    }
  });

  test("returns the correct string value for colors in the HWB color space", () => {
    for (const color of colors) {
      const { string } = new Color({
        h: color.hwb[0],
        w: color.hwb[1],
        b: color.hwb[2],
      });
      expect(string).toBe(color.hwbString);
    }
  });

  test("returns the correct string value for colors in the RGB color space", () => {
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
