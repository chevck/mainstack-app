import { formatMoney, formatDate } from "../../utils/index";

describe("formatMoney", () => {
  it("should format positive numbers correctly", () => {
    expect(formatMoney(1000)).toBe("USD 1,000");
    expect(formatMoney(1234.56)).toBe("USD 1,234.56");
    expect(formatMoney(1000000)).toBe("USD 1,000,000");
  });

  it("should format zero correctly", () => {
    expect(formatMoney(0)).toBe("USD 0");
  });

  it("should format negative numbers correctly", () => {
    expect(formatMoney(-1000)).toBe("-USD 1,000");
  });

  it("should remove .00 from whole numbers", () => {
    expect(formatMoney(100.0)).toBe("USD 100");
  });

  it("should handle decimal values", () => {
    expect(formatMoney(1234.5)).toBe("USD 1,234.50");
    expect(formatMoney(99.99)).toBe("USD 99.99");
  });

  it("should handle large numbers", () => {
    expect(formatMoney(1234567.89)).toBe("USD 1,234,567.89");
  });
});

describe("formatDate", () => {
  it("should format valid date strings correctly", () => {
    const date = "2024-01-15T00:00:00.000Z";
    const formatted = formatDate(date);
    expect(formatted).toMatch(/Jan \d{1,2}, 2024/);
  });

  it("should format dates with different months", () => {
    const date = "2024-12-25T00:00:00.000Z";
    const formatted = formatDate(date);
    expect(formatted).toMatch(/Dec \d{1,2}, 2024/);
  });

  it("should handle empty string", () => {
    // Note: This will return "Invalid Date" string, which is expected behavior
    const formatted = formatDate("");
    expect(typeof formatted).toBe("string");
  });

  it("should format ISO date strings", () => {
    const date = "2023-06-30T12:00:00.000Z";
    const formatted = formatDate(date);
    expect(formatted).toMatch(/Jun \d{1,2}, 2023/);
  });
});
