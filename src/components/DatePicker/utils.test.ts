import { datesAreWithinMaxRange } from "./utils";

describe("DatePicker utils", () => {
  describe("checking if two dates are fall within a range", () => {
    it("returns true if the two dates are within the range", () => {
      const date1 = new Date("07-01-2025");
      const date2 = new Date("07-08-2025");

      expect(datesAreWithinMaxRange(date1, date2, 15)).toBeTruthy();
    });

    it("returns false if the two dates are not within the range", () => {
      const date1 = new Date("07-01-2025");
      const date2 = new Date("07-31-2025");

      expect(datesAreWithinMaxRange(date1, date2, 15)).toBeFalsy();
    })

    it("is inclusive with dates", () => {
      const date1 = new Date("07-01-2025");
      const date2 = new Date("07-16-2025");

      expect(datesAreWithinMaxRange(date1, date2, 15)).toBeTruthy();
    })
  });
});
