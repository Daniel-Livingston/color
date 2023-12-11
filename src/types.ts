import { keywords } from "./keywords";

export type AdjustableColorValues =
  | AdjustableHSLValues
  | AdjustableHWBValues
  | AdjustableRGBValues;

export type AdjustableHSLValues = Partial<HSLObject>;

export type AdjustableHWBValues = Partial<HWBObject>;

export type AdjustableRGBValues = Partial<RGBObject>;

export type CMYKObject = {
  cyan: number;
  magenta: number;
  yellow: number;
  key: number;
};

export type ColorParam =
  | string
  | CMYKObject
  | HSLObject
  | HSVObject
  | HWBObject
  | RGBObject;

export type ColorSpace = "cmyk" | "hsl" | "hsv" | "hwb" | "rgb";

export type HSLObject = {
  hue: number;
  saturation: number;
  lightness: number;
};

export type HSVObject = {
  hue: number;
  saturation: number;
  value: number;
};

export type HWBObject = {
  hue: number;
  whiteness: number;
  blackness: number;
};

export type Keyword = keyof typeof keywords;

export type RGBObject = {
  red: number;
  green: number;
  blue: number;
};

export type ScalableColorValues =
  | ScalableRGBValues
  | ScalableHSLValues
  | ScalableHWBValues;

export type ScalableHSLValues = Partial<Omit<HSLObject, "hue">>;

export type ScalableHWBValues = Partial<Omit<HWBObject, "hue">>;

export type ScalableRGBValues = Partial<RGBObject>;
