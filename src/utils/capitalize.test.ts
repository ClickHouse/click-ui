import { describe, it, expect } from "vitest";
import { capitalize } from "./capitalize";

describe("capitalize", () => {
  it("should capitalize the first letter of a lowercase string", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("should keep the first letter capitalized if already uppercase", () => {
    expect(capitalize("World")).toBe("World");
  });

  it("should handle single character strings", () => {
    expect(capitalize("a")).toBe("A");
  });

  it("should handle empty strings", () => {
    expect(capitalize("")).toBe("");
  });

  it("should handle strings with spaces (only capitalizes first letter)", () => {
    expect(capitalize("hello world")).toBe("Hello world");
  });

  it("should only capitalize the first letter, leaving the rest unchanged", () => {
    expect(capitalize("hELLO")).toBe("HELLO");
  });

  it("should convert kebab-case to PascalCase", () => {
    expect(capitalize("space-between")).toBe("SpaceBetween");
    expect(capitalize("space-around")).toBe("SpaceAround");
    expect(capitalize("space-evenly")).toBe("SpaceEvenly");
  });

  it("should handle kebab-case with multiple segments", () => {
    expect(capitalize("row-dense")).toBe("RowDense");
    expect(capitalize("column-dense")).toBe("ColumnDense");
  });
});
