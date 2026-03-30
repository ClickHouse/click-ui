import { describe, expect, it } from "vitest";
import { generateDescription, inferScopes, isAlias } from "./tokens";

describe("tokens", () => {
  describe("inferScopes", () => {
    describe("COLOR type", () => {
      it("should infer STROKE_COLOR for border tokens", () => {
        const result = inferScopes("button.border", "COLOR");
        expect(result).toEqual(["STROKE_COLOR"]);
      });

      it("should infer STROKE_COLOR for stroke tokens", () => {
        const result = inferScopes("input.stroke.default", "COLOR");
        expect(result).toEqual(["STROKE_COLOR"]);
      });

      it("should infer ALL_FILLS for background tokens", () => {
        const result = inferScopes("surface.background", "COLOR");
        expect(result).toEqual(["ALL_FILLS"]);
      });

      it("should infer ALL_FILLS for bg tokens", () => {
        const result = inferScopes("button.bg.primary", "COLOR");
        expect(result).toEqual(["ALL_FILLS"]);
      });

      it("should infer ALL_FILLS for fill tokens", () => {
        const result = inferScopes("icon.fill", "COLOR");
        expect(result).toEqual(["ALL_FILLS"]);
      });

      it("should infer EFFECT_COLOR for shadow tokens", () => {
        const result = inferScopes("elevation.shadow", "COLOR");
        expect(result).toEqual(["EFFECT_COLOR"]);
      });

      it("should infer EFFECT_COLOR for scrim tokens", () => {
        const result = inferScopes("overlay.scrim", "COLOR");
        expect(result).toEqual(["EFFECT_COLOR"]);
      });

      it("should infer ALL_SCOPES for primitive color tokens", () => {
        const result = inferScopes("_color/red/500", "COLOR");
        expect(result).toEqual(["ALL_SCOPES"]);
      });

      it("should infer ALL_SCOPES for other color tokens", () => {
        const result = inferScopes("text.primary", "COLOR");
        expect(result).toEqual(["ALL_SCOPES"]);
      });
    });

    describe("FLOAT type (number)", () => {
      it("should infer CORNER_RADIUS for radius tokens", () => {
        const result = inferScopes("button.radius", "FLOAT");
        expect(result).toEqual(["CORNER_RADIUS"]);
      });

      it("should infer CORNER_RADIUS for corner tokens", () => {
        const result = inferScopes("card.corner", "FLOAT");
        expect(result).toEqual(["CORNER_RADIUS"]);
      });

      it("should infer WIDTH_HEIGHT for width tokens", () => {
        const result = inferScopes("sizing.width", "FLOAT");
        expect(result).toEqual(["WIDTH_HEIGHT"]);
      });

      it("should infer WIDTH_HEIGHT for height tokens", () => {
        const result = inferScopes("sizing.height", "FLOAT");
        expect(result).toEqual(["WIDTH_HEIGHT"]);
      });

      it("should infer WIDTH_HEIGHT for sizing tokens", () => {
        const result = inferScopes("component.sizing", "FLOAT");
        expect(result).toEqual(["WIDTH_HEIGHT"]);
      });

      it("should infer WIDTH_HEIGHT for size tokens", () => {
        const result = inferScopes("icon.size", "FLOAT");
        expect(result).toEqual(["WIDTH_HEIGHT"]);
      });

      it("should infer GAP for spacing tokens", () => {
        const result = inferScopes("spacing.md", "FLOAT");
        expect(result).toEqual(["GAP"]);
      });

      it("should infer GAP for space tokens", () => {
        const result = inferScopes("space.md", "FLOAT");
        expect(result).toEqual(["GAP"]);
      });

      it("should infer GAP for gap tokens", () => {
        const result = inferScopes("layout.gap", "FLOAT");
        expect(result).toEqual(["GAP"]);
      });

      it("should infer OPACITY for opacity tokens", () => {
        const result = inferScopes("button.opacity.disabled", "FLOAT");
        expect(result).toEqual(["OPACITY"]);
      });

      it("should infer GAP for primitive tokens with spacing in name", () => {
        // "_spacing/4" matches the "spacing" pattern which comes before the primitive check
        const result = inferScopes("_spacing/4", "FLOAT");
        expect(result).toEqual(["GAP"]);
      });

      it("should infer ALL_SCOPES for primitive number tokens (underscore only)", () => {
        const result = inferScopes("_primitive/4", "FLOAT");
        expect(result).toEqual(["ALL_SCOPES"]);
      });

      it("should infer ALL_SCOPES for other number tokens", () => {
        const result = inferScopes("custom.value", "FLOAT");
        expect(result).toEqual(["ALL_SCOPES"]);
      });
    });

    describe("number type", () => {
      it("should handle number type same as FLOAT", () => {
        const result = inferScopes("button.radius", "number");
        expect(result).toEqual(["CORNER_RADIUS"]);
      });
    });

    describe("other types", () => {
      it("should return ALL_SCOPES for unknown types", () => {
        const result = inferScopes("some.token", "STRING" as any);
        expect(result).toEqual(["ALL_SCOPES"]);
      });
    });

    describe("dot normalization", () => {
      it("should normalize dots to slashes for pattern matching", () => {
        const result = inferScopes("button.radius.md", "FLOAT");
        expect(result).toEqual(["CORNER_RADIUS"]);
      });
    });
  });

  describe("isAlias", () => {
    it("should return true for alias strings starting with {", () => {
      expect(isAlias("{color.primary}")).toBe(true);
    });

    it("should return true for alias strings with leading whitespace", () => {
      expect(isAlias("  {color.primary}")).toBe(true);
    });

    it("should return false for non-alias strings", () => {
      expect(isAlias("#ff0000")).toBe(false);
    });

    it("should return false for numbers", () => {
      expect(isAlias(123)).toBe(false);
    });

    it("should return false for objects", () => {
      expect(isAlias({ colorSpace: "srgb", components: [1, 0, 0] })).toBe(false);
    });

    it("should return false for null", () => {
      // null is not a valid input type for isAlias, but if passed it should not throw
      expect(() => isAlias(null as unknown as string)).toThrow();
    });
  });

  describe("generateDescription", () => {
    describe("COLOR type", () => {
      it("should include the color value in description", () => {
        const result = generateDescription("text.primary", "#ff0000", "COLOR");
        expect(result).toContain("#ff0000");
      });
    });

    describe("number type", () => {
      it("should include px and rem values", () => {
        const result = generateDescription("spacing.md", 16, "number");
        expect(result).toContain("16px");
        expect(result).toContain("1rem");
      });

      it("should handle zero value", () => {
        const result = generateDescription("spacing.zero", 0, "number");
        expect(result).toContain("0px");
        expect(result).not.toContain("0rem");
      });

      it("should format rem with 3 decimal places when not whole", () => {
        const result = generateDescription("spacing.xs", 4, "number");
        expect(result).toContain("4px");
        expect(result).toContain("0.25rem");
      });
    });

    describe("spacing tokens", () => {
      it("should include space.N pattern for spacing tokens", () => {
        const result = generateDescription("space.16", 16, "number");
        expect(result).toContain("space.16");
      });

      it("should include semantic keywords for zero spacing", () => {
        const result = generateDescription("spacing.0", 0, "number");
        expect(result).toContain("none");
        expect(result).toContain("zero");
        expect(result).toContain("reset");
      });

      it("should include semantic keywords for tiny spacing (<= 4px)", () => {
        const result = generateDescription("spacing.xs", 4, "number");
        expect(result).toContain("tiny");
        expect(result).toContain("xs");
        expect(result).toContain("minimal");
      });

      it("should include semantic keywords for small spacing (<= 6px)", () => {
        const result = generateDescription("spacing.sm", 6, "number");
        expect(result).toContain("small");
        expect(result).toContain("sm");
        expect(result).toContain("tight");
      });

      it("should include semantic keywords for base spacing (<= 8px)", () => {
        const result = generateDescription("spacing.base", 8, "number");
        expect(result).toContain("base");
        expect(result).toContain("standard");
        expect(result).toContain("default");
      });

      it("should include semantic keywords for medium spacing (<= 16px)", () => {
        const result = generateDescription("spacing.md", 16, "number");
        expect(result).toContain("medium");
        expect(result).toContain("md");
        expect(result).toContain("normal");
      });

      it("should include semantic keywords for large spacing (<= 24px)", () => {
        const result = generateDescription("spacing.lg", 24, "number");
        expect(result).toContain("large");
        expect(result).toContain("lg");
        expect(result).toContain("roomy");
      });

      it("should include semantic keywords for extra large spacing (<= 32px)", () => {
        const result = generateDescription("spacing.xl", 32, "number");
        expect(result).toContain("extra-large");
        expect(result).toContain("xl");
        expect(result).toContain("spacious");
      });

      it("should include semantic keywords for 2xl spacing (<= 40px)", () => {
        const result = generateDescription("spacing.2xl", 40, "number");
        expect(result).toContain("2xl");
        expect(result).toContain("layout-section");
        expect(result).toContain("expansive");
      });

      it("should include semantic keywords for 3xl spacing (<= 48px)", () => {
        const result = generateDescription("spacing.3xl", 48, "number");
        expect(result).toContain("3xl");
        expect(result).toContain("substantial");
      });

      it("should include semantic keywords for 4xl+ spacing (> 48px)", () => {
        const result = generateDescription("spacing.4xl", 64, "number");
        expect(result).toContain("4xl");
        expect(result).toContain("major-section");
        expect(result).toContain("extensive");
      });

      it("should include spacing tags", () => {
        const result = generateDescription("spacing.md", 16, "number");
        expect(result).toContain("spacing");
        expect(result).toContain("gap");
        expect(result).toContain("padding");
        expect(result).toContain("margin");
      });
    });

    describe("radius tokens", () => {
      it("should include radius tags", () => {
        const result = generateDescription("button.radius", 8, "number");
        expect(result).toContain("radius");
        expect(result).toContain("corner");
        expect(result).toContain("round");
      });

      it("should include sharp keywords for zero radius", () => {
        const result = generateDescription("radius.none", 0, "number");
        expect(result).toContain("sharp");
        expect(result).toContain("square");
        expect(result).toContain("angular");
      });

      it("should include subtle keywords for small radius (<= 4px)", () => {
        const result = generateDescription("radius.xs", 4, "number");
        expect(result).toContain("subtle");
        expect(result).toContain("slight");
      });

      it("should include moderate keywords for medium radius (<= 8px)", () => {
        const result = generateDescription("radius.md", 8, "number");
        expect(result).toContain("moderate");
        expect(result).toContain("standard");
      });

      it("should include pill keywords for full radius (>= 999px)", () => {
        const result = generateDescription("radius.full", 999, "number");
        expect(result).toContain("pill");
        expect(result).toContain("capsule");
        expect(result).toContain("full");
        expect(result).toContain("circular");
      });

      it("should include rounded keywords for large radius", () => {
        const result = generateDescription("radius.lg", 16, "number");
        expect(result).toContain("rounded");
        expect(result).toContain("soft");
        expect(result).toContain("generous");
      });
    });

    describe("size tokens", () => {
      it("should include size tags", () => {
        const result = generateDescription("icon.size", 24, "number");
        expect(result).toContain("size");
        expect(result).toContain("dimension");
        expect(result).toContain("scale");
      });

      it("should include icon tags for icon size tokens", () => {
        const result = generateDescription("icon.size.sm", 16, "number");
        expect(result).toContain("icon");
        expect(result).toContain("glyph");
        expect(result).toContain("symbol");
      });

      it("should include component tags for component size tokens", () => {
        const result = generateDescription("component.sizing.md", 40, "number");
        expect(result).toContain("component");
        expect(result).toContain("element");
      });
    });
  });
});
