import { describe, it, expect } from "vitest";
import { formatDate, cn } from "./utils";

describe("formatDate", () => {
  it("should format a date string correctly", () => {
    const dateString = "2022-04-30";
    const result = formatDate(dateString);
    expect(result).toBe("Apr 30, 2022");
  });

  it("should format a Date object correctly", () => {
    const date = new Date("2022-04-30");
    const result = formatDate(date);
    expect(result).toBe("Apr 30, 2022");
  });

  it("should handle different months correctly", () => {
    expect(formatDate("2022-01-01")).toBe("Jan 01, 2022");
    expect(formatDate("2022-06-15")).toBe("Jun 15, 2022");
    expect(formatDate("2022-12-31")).toBe("Dec 31, 2022");
  });

  it("should handle leap year dates", () => {
    expect(formatDate("2024-02-29")).toBe("Feb 29, 2024");
  });

  it("should handle single digit days with padding", () => {
    expect(formatDate("2022-04-05")).toBe("Apr 05, 2022");
  });

  it("should handle invalid date strings gracefully", () => {
    const result = formatDate("invalid-date");
    expect(result).toBe("undefined NaN, NaN");
  });
});

describe("cn", () => {
  it("should merge class names correctly", () => {
    const result = cn("class1", "class2");
    expect(result).toBe("class1 class2");
  });

  it("should handle conditional classes", () => {
    const result = cn("base", true && "conditional", false && "hidden");
    expect(result).toBe("base conditional");
  });

  it("should handle undefined and null values", () => {
    const result = cn("base", undefined, null, "end");
    expect(result).toBe("base end");
  });

  it("should handle empty strings", () => {
    const result = cn("base", "", "end");
    expect(result).toBe("base end");
  });

  it("should handle arrays of classes", () => {
    const result = cn(["class1", "class2"], "class3");
    expect(result).toBe("class1 class2 class3");
  });

  it("should handle objects with boolean values", () => {
    const result = cn({
      class1: true,
      class2: false,
      class3: true,
    });
    expect(result).toBe("class1 class3");
  });

  it("should merge Tailwind classes correctly", () => {
    const result = cn("px-4 py-2", "px-6");
    expect(result).toBe("py-2 px-6");
  });
});
