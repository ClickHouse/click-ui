import { expect } from "vitest";
import { truncateFilename } from "@/utils/truncate";

describe("truncateFilename", () => {
  it("dotfile (short)", () => {
    const filename = ".github";
    const truncated = truncateFilename(filename);
    expect(truncated).toBe(".github");
  });

  it("dotfile (long)", () => {
    const filename = ".gitignoreverylongfilename";
    const truncated = truncateFilename(filename, 10, "...");
    expect(truncated).toBe(".gitignore...");
  });

  it("file name with extension", () => {
    const filename = "testalargefilename.png";
    const truncated = truncateFilename(filename, 10);
    expect(truncated).toBe("testalarge~.png");
  });

  it("file name with extension lower than threshold", () => {
    const filename = "test.png";
    const truncated = truncateFilename(filename);
    expect(truncated).toBe(filename);
  });

  it("file name with same length as the threshold", () => {
    const filename = "test.png";
    const truncated = truncateFilename(filename, filename.length);
    expect(truncated).toBe(filename);
  });
});
