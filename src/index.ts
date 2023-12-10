import Color from "./color";
import CMYK from "./cmyk";
import HSL from "./hsl";
import HSV from "./hsv";
import HWB from "./hwb";
import RGB from "./rgb";

export default function (
  color:
    | string
    | { c: number; m: number; y: number; k: number }
    | { h: number; s: number; l: number }
    | { h: number; s: number; v: number }
    | { h: number; w: number; b: number }
    | { r: number; g: number; b: number }
): Color {
  if (typeof color === "string") {
    if (color.startsWith("cmyk")) {
      return new CMYK(color);
    }

    if (color.startsWith("hsl")) {
      return new HSL(color);
    }

    if (color.startsWith("hsv")) {
      return new HSV(color);
    }

    if (color.startsWith("hwb")) {
      return new HWB(color);
    }

    if (color.startsWith("rgb")) {
      return new RGB(color);
    }

    if (color.startsWith("#")) {
      return new RGB(color);
    }

    throw new Error(`Invalid color string: ${color}`);
  }

  if ("c" in color) {
    return new CMYK(color);
  }

  if ("l" in color) {
    return new HSL(color);
  }

  if ("v" in color) {
    return new HSV(color);
  }

  if ("w" in color) {
    return new HWB(color);
  }

  return new RGB(color);
}
