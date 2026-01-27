import { expect } from "vitest";
import { shortenMiddle } from "@/utils/truncate";

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
