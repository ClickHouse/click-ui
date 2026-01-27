import { expect } from "vitest";
import { truncateFilename, shortenMiddle } from "@/utils/truncate";

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

describe("shortenMiddle", () => {
  it("should return unchanged when filename is within maxLen", () => {
    const filename = "console.clickhouse.cloud_Archive.01.csv";
    expect(shortenMiddle(filename)).toBe(filename);
  });

  it("should shorten filename with default delimiter in the middle", () => {
    const filename =
      "console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-001.csv";
    const result = shortenMiddle(filename);
    expect(result).toBe("console.clickhous...ong-filename-001.csv");
  });

  it("should shorten filename without extension", () => {
    const filename =
      "admin_postgresql_heroku_Backup_03-22-2023_transaction-logs-monthly-summary";
    const result = shortenMiddle(filename);
    expect(result).toBe("admin_postgresql_he...gs-monthly-summary");
  });

  it("shgould shorten with custom maxLen", () => {
    const filename =
      "dashboard.mongodb.atlas_Export.12-15-2024.customer-data-analysis-report-final-v2.json";
    const result = shortenMiddle(filename, 50);
    expect(result).toBe("dashboard.mongodb.atl...lysis-report-final-v2.json");
    expect(result.length).toBe(50);
  });
});
