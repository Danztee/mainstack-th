import { describe, it, expect } from "vitest";
import {
  filterTransactions,
  getActiveFiltersCount,
  getFilterDescription,
  type FilterState,
} from "./filters";
import { Transaction } from "@/types";

const mockTransactions: Transaction[] = [
  {
    amount: 100,
    status: "successful",
    type: "deposit",
    date: "2024-01-15",
    metadata: {
      name: "John Doe",
      type: "digital_product",
      email: "john@example.com",
      quantity: 1,
      country: "US",
      product_name: "E-book",
    },
  },
  {
    amount: 50,
    status: "pending",
    type: "withdrawal",
    date: "2024-01-20",
    metadata: {
      name: "Jane Smith",
      type: "withdrawal",
      email: "jane@example.com",
      quantity: 1,
      country: "CA",
    },
  },
  {
    amount: 25,
    status: "failed",
    type: "deposit",
    date: "2024-01-25",
    metadata: {
      name: "Bob Wilson",
      type: "tip",
      email: "bob@example.com",
      quantity: 1,
      country: "UK",
    },
  },
  {
    amount: 75,
    status: "successful",
    type: "deposit",
    date: "2024-02-01",
    metadata: {
      name: "Alice Brown",
      type: "coffee",
      email: "alice@example.com",
      quantity: 2,
      country: "AU",
      product_name: "Coffee",
    },
  },
];

describe("filterTransactions", () => {
  it("should return all transactions when no filters are applied", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: [],
    };

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(4);
  });

  it("should filter by status", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: ["successful"],
      types: [],
    };

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.status === "successful")).toBe(true);
  });

  it("should filter by multiple statuses", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: ["successful", "pending"],
      types: [],
    };

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(3);
  });

  it("should filter by transaction types", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: ["storeTransactions"],
    };

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(2);
  });

  it("should filter by withdrawal type", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: ["withdrawal"],
    };

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("withdrawal");
  });

  it("should filter by date range", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: new Date("2024-01-20"),
      dateTo: new Date("2024-01-25"),
      statuses: [],
      types: [],
    };

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(2);
  });

  it("should filter by period - today", () => {
    const today = new Date("2024-01-15");
    const filters: FilterState = {
      period: "today",
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: [],
    };

    const originalDate = Date;
    global.Date = class extends Date {
      constructor(...args: unknown[]) {
        if (args.length === 0) {
          super(today);
        } else {
          super(...(args as ConstructorParameters<typeof Date>));
        }
      }
    } as typeof Date;

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(4);

    global.Date = originalDate;
  });

  it("should combine multiple filters", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: new Date("2024-01-15"),
      dateTo: new Date("2024-01-25"),
      statuses: ["successful"],
      types: ["storeTransactions"],
    };

    const result = filterTransactions(mockTransactions, filters);
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe("successful");
    expect(result[0].metadata?.type).toBe("digital_product");
  });

  it("should handle empty transactions array", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: [],
    };

    const result = filterTransactions([], filters);
    expect(result).toHaveLength(0);
  });
});

describe("getActiveFiltersCount", () => {
  it("should return 0 when no filters are active", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: [],
    };

    expect(getActiveFiltersCount(filters)).toBe(0);
  });

  it("should count period filter", () => {
    const filters: FilterState = {
      period: "today",
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: [],
    };

    expect(getActiveFiltersCount(filters)).toBe(1);
  });

  it("should count date filters", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: new Date("2024-01-01"),
      dateTo: undefined,
      statuses: [],
      types: [],
    };

    expect(getActiveFiltersCount(filters)).toBe(1);
  });

  it("should count status filters", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: ["successful"],
      types: [],
    };

    expect(getActiveFiltersCount(filters)).toBe(1);
  });

  it("should count type filters", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: ["storeTransactions"],
    };

    expect(getActiveFiltersCount(filters)).toBe(1);
  });

  it("should count multiple active filters", () => {
    const filters: FilterState = {
      period: "today",
      dateFrom: new Date("2024-01-01"),
      dateTo: new Date("2024-01-31"),
      statuses: ["successful", "pending"],
      types: ["storeTransactions", "withdrawal"],
    };

    expect(getActiveFiltersCount(filters)).toBe(5);
  });
});

describe("getFilterDescription", () => {
  it("should return default description when no filters are active", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: [],
    };

    const result = getFilterDescription(filters, 100);
    expect(result).toBe("Your transactions for the last 7 days");
  });

  it("should describe period filters", () => {
    const filters: FilterState = {
      period: "today",
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: [],
    };

    const result = getFilterDescription(filters, 100);
    expect(result).toBe(
      "Filtered results from 100 total transactions for today"
    );
  });

  it("should describe date range filters", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: new Date("2024-01-01"),
      dateTo: new Date("2024-01-31"),
      statuses: [],
      types: [],
    };

    const result = getFilterDescription(filters, 100);
    expect(result).toContain("from Jan 01, 2024 to Jan 31, 2024");
  });

  it("should describe type filters", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: ["storeTransactions"],
    };

    const result = getFilterDescription(filters, 100);
    expect(result).toContain("Store Transactions");
  });

  it("should describe multiple type filters", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: ["storeTransactions", "withdrawal"],
    };

    const result = getFilterDescription(filters, 100);
    expect(result).toContain("Store Transactions and Withdrawals");
  });

  it("should describe three or more type filters", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: [],
      types: ["storeTransactions", "withdrawal", "chargebacks"],
    };

    const result = getFilterDescription(filters, 100);
    expect(result).toContain(
      "Store Transactions, Withdrawals, and Chargebacks"
    );
  });

  it("should describe status filters", () => {
    const filters: FilterState = {
      period: null,
      dateFrom: undefined,
      dateTo: undefined,
      statuses: ["successful"],
      types: [],
    };

    const result = getFilterDescription(filters, 100);
    expect(result).toContain("Successful");
  });

  it("should combine multiple filter types", () => {
    const filters: FilterState = {
      period: "last7days",
      dateFrom: undefined,
      dateTo: undefined,
      statuses: ["successful"],
      types: ["storeTransactions"],
    };

    const result = getFilterDescription(filters, 100);
    expect(result).toContain("the last 7 days");
    expect(result).toContain("Store Transactions");
    expect(result).toContain("Successful");
  });
});
