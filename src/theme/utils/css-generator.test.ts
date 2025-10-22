import { describe, it, expect } from "vitest";
import { generateCSSVariables, themeToFlatVariables } from "./css-generator";

describe("css-generator", () => {
  describe("generateCSSVariables", () => {
    it("should handle simple string values", () => {
      const obj = {
        color: {
          primary: "#ff0000",
        },
      };
      const css = generateCSSVariables(obj);
      expect(css).toContain("--color-primary: #ff0000;");
    });

    it("should handle number values", () => {
      const obj = {
        size: {
          base: 16,
        },
      };
      const css = generateCSSVariables(obj);
      expect(css).toContain("--size-base: 16;");
    });

    it("should handle arrays with kebab-case indexing", () => {
      const obj = {
        border: {
          radii: ["0px", "4px", "8px", "12px"],
        },
      };
      const css = generateCSSVariables(obj);
      expect(css).toContain("--border-radii-0: 0px;");
      expect(css).toContain("--border-radii-1: 4px;");
      expect(css).toContain("--border-radii-2: 8px;");
      expect(css).toContain("--border-radii-3: 12px;");
    });

    it("should handle arrays with number values", () => {
      const obj = {
        spaces: [0, 4, 8, 16, 32],
      };
      const css = generateCSSVariables(obj);
      expect(css).toContain("--spaces-0: 0;");
      expect(css).toContain("--spaces-1: 4;");
      expect(css).toContain("--spaces-2: 8;");
      expect(css).toContain("--spaces-3: 16;");
      expect(css).toContain("--spaces-4: 32;");
    });

    it("should skip non-variable fields", () => {
      const obj = {
        name: "light",
        isSystem: false,
        resolvedTheme: "light",
        color: {
          primary: "#ff0000",
        },
      };
      const css = generateCSSVariables(obj);
      expect(css).not.toContain("--name:");
      expect(css).not.toContain("--isSystem:");
      expect(css).not.toContain("--resolvedTheme:");
      expect(css).toContain("--color-primary: #ff0000;");
    });
  });

  describe("themeToFlatVariables", () => {
    it("should convert theme to flat variable map", () => {
      const theme = {
        border: {
          radii: ["0px", "4px", "8px", "12px"],
        },
        color: {
          primary: "#ff0000",
        },
      };
      const vars = themeToFlatVariables(theme as any);

      expect(vars["--border-radii-0"]).toBe("0px");
      expect(vars["--border-radii-1"]).toBe("4px");
      expect(vars["--border-radii-2"]).toBe("8px");
      expect(vars["--border-radii-3"]).toBe("12px");
      expect(vars["--color-primary"]).toBe("#ff0000");
    });

    it("should handle nested arrays", () => {
      const theme = {
        typography: {
          sizes: [10, 12, 14, 16],
        },
      };
      const vars = themeToFlatVariables(theme as any);

      expect(vars["--typography-sizes-0"]).toBe("10");
      expect(vars["--typography-sizes-1"]).toBe("12");
      expect(vars["--typography-sizes-2"]).toBe("14");
      expect(vars["--typography-sizes-3"]).toBe("16");
    });
  });
});
