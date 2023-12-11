import Color from "./color";
import CMYK from "./cmyk";
import HSL from "./hsl";
import HSV from "./hsv";
import HWB from "./hwb";
import RGB from "./rgb";
import type { ColorParam } from "./types";

export default function (color: ColorParam): Color {
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

  if ("cyan" in color) {
    return new CMYK(color);
  }

  if ("lightness" in color) {
    return new HSL(color);
  }

  if ("value" in color) {
    return new HSV(color);
  }

  if ("whiteness" in color) {
    return new HWB(color);
  }

  return new RGB(color);
}
