import type { DTCGColorValue, RGBAColor, RGBColor } from "./types";

export function rgbToHex({ r, g, b, a }: RGBAColor): string {
  if (a !== undefined && a !== 1) {
    return `rgba(${[r, g, b]
      .map((n) => Math.round(n * 255))
      .join(", ")}, ${a.toFixed(4)})`;
  }

  const toHex = (value: number): string => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join("");
  return `#${hex}`;
}

function isDTCGColorValue(value: unknown): value is DTCGColorValue {
  return (
    typeof value === "object" &&
    value !== null &&
    "colorSpace" in value &&
    "components" in value &&
    Array.isArray((value as DTCGColorValue).components)
  );
}

function parseDTCGColor(colorValue: DTCGColorValue): RGBAColor {
  const { colorSpace, components, alpha, hex } = colorValue;



  if (hex) {
    const hexValue = hex.substring(1);
    const expandedHex =
      hexValue.length === 3
        ? hexValue
            .split("")
            .map((char) => char + char)
            .join("")
        : hexValue;
    const result: RGBAColor = {
      r: parseInt(expandedHex.slice(0, 2), 16) / 255,
      g: parseInt(expandedHex.slice(2, 4), 16) / 255,
      b: parseInt(expandedHex.slice(4, 6), 16) / 255,
    };
    if (alpha !== undefined && alpha !== 1) {
      result.a = alpha;
    }
    return result;
  }


  if (colorSpace === "hsl") {
    const [h, s, l] = components;
    const result = hslToRgbFloat(h, s / 100, l / 100);
    if (alpha !== undefined && alpha !== 1) {
      return { ...result, a: alpha };
    }
    return result;
  }


  if (colorSpace === "srgb" || colorSpace.includes("rgb")) {
    const [r, g, b] = components;
    const result: RGBAColor = { r, g, b };
    if (alpha !== undefined && alpha !== 1) {
      result.a = alpha;
    }
    return result;
  }

  throw new Error(`Unsupported DTCG color space: ${colorSpace}`);
}

export function parseColor(color: string | DTCGColorValue): RGBAColor {

  if (isDTCGColorValue(color)) {
    return parseDTCGColor(color);
  }


  if (typeof color !== "string") {
    throw new Error(`Invalid color format: ${JSON.stringify(color)}`);
  }

  color = color.trim();

  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const rgbaRegex =
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d.]+)\s*\)$/;
  const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
  const hslaRegex =
    /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([\d.]+)\s*\)$/;
  const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
  const floatRgbRegex =
    /^\{\s*r:\s*[\d.]+,\s*g:\s*[\d.]+,\s*b:\s*[\d.]+(,\s*opacity:\s*[\d.]+)?\s*\}$/;

  let match: RegExpMatchArray | null;

  if ((match = color.match(rgbRegex))) {
    const [, rStr, gStr, bStr] = match;
    return {
      r: parseInt(rStr!, 10) / 255,
      g: parseInt(gStr!, 10) / 255,
      b: parseInt(bStr!, 10) / 255,
    };
  }

  if ((match = color.match(rgbaRegex))) {
    const [, rStr, gStr, bStr, aStr] = match;
    return {
      r: parseInt(rStr!, 10) / 255,
      g: parseInt(gStr!, 10) / 255,
      b: parseInt(bStr!, 10) / 255,
      a: parseFloat(aStr!),
    };
  }

  if ((match = color.match(hslRegex))) {
    const [, hStr, sStr, lStr] = match;
    return hslToRgbFloat(
      parseInt(hStr!, 10),
      parseInt(sStr!, 10) / 100,
      parseInt(lStr!, 10) / 100,
    );
  }

  if ((match = color.match(hslaRegex))) {
    const [, hStr, sStr, lStr, aStr] = match;
    return {
      ...hslToRgbFloat(
        parseInt(hStr!, 10),
        parseInt(sStr!, 10) / 100,
        parseInt(lStr!, 10) / 100,
      ),
      a: parseFloat(aStr!),
    };
  }

  if (hexRegex.test(color)) {
    const hexValue = color.substring(1);
    const expandedHex =
      hexValue.length === 3
        ? hexValue
            .split("")
            .map((char) => char + char)
            .join("")
        : hexValue;
    return {
      r: parseInt(expandedHex.slice(0, 2), 16) / 255,
      g: parseInt(expandedHex.slice(2, 4), 16) / 255,
      b: parseInt(expandedHex.slice(4, 6), 16) / 255,
    };
  }

  if (floatRgbRegex.test(color)) {
    return JSON.parse(color) as RGBAColor;
  }

  throw new Error(`Invalid color format: ${color}`);
}

export function hslToRgbFloat(h: number, s: number, l: number): RGBColor {
  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  if (s === 0) {
    return { r: l, g: l, b: l };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hNorm = h / 360;
  const r = hue2rgb(p, q, (hNorm + 1 / 3) % 1);
  const g = hue2rgb(p, q, hNorm % 1);
  const b = hue2rgb(p, q, (hNorm - 1 / 3 + 1) % 1);

  return { r, g, b };
}
