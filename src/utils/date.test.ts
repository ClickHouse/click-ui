import { isDateInFuture } from "./date";

describe("date utils", () => {
  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 6, 4));
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe("determining if a date is in the future", () => {
    it("returns true if the the year is in the future", () => {
      const futureDate = new Date(2025, 0, 1);
      expect(isDateInFuture(futureDate)).toBeTruthy();
    });

    it("returns true if the year is the same and the month is in the future", () => {
      const futureDate = new Date(2024, 7, 1);
      expect(isDateInFuture(futureDate)).toBeTruthy();
    });

    it("returns true if the year and month are the same, but the day is in the future", () => {
      const futureDate = new Date(2024, 6, 5);
      expect(isDateInFuture(futureDate)).toBeTruthy();
    });

    it("returns false if the year is in the past", () => {
      const pastDate = new Date(2020, 2, 20);
      expect(isDateInFuture(pastDate)).toBeFalsy();
    });

    it("returns false if the year is the same, but the month is in the past", () => {
      const pastDate = new Date(2024, 5, 1);
      expect(isDateInFuture(pastDate)).toBeFalsy();
    });

    it("returns false if the year and the month are the same but the day is not in the future", () => {
      const pastDate = new Date(2024, 6, 1);
      expect(isDateInFuture(pastDate)).toBeFalsy();

      const today = new Date(2024, 6, 4);
      expect(isDateInFuture(today)).toBeFalsy();
    });
  });
});
