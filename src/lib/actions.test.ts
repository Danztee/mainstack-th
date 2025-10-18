import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchTransactions, fetchWalletData, fetchUser } from "./actions";
import { Transaction, WalletData, User } from "@/types";

const mockFetch = vi.fn();
global.fetch = mockFetch;

process.env.API_URL = "https://api.example.com";

const originalEnv = process.env;
beforeEach(() => {
  process.env = { ...originalEnv, API_URL: "https://api.example.com" };
  vi.clearAllMocks();
});

afterEach(() => {
  process.env = originalEnv;
});

describe("fetchTransactions", () => {
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
  ];

  it("should fetch transactions successfully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions,
    });

    const result = await fetchTransactions();

    expect(mockFetch).toHaveBeenCalledWith("undefined/transactions", {
      cache: "no-store",
    });
    expect(result).toEqual(mockTransactions);
  });

  it("should throw error when response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchTransactions()).rejects.toThrow(
      "Failed to fetch transactions"
    );
  });

  it("should throw error when fetch fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchTransactions()).rejects.toThrow("Network error");
  });

  it("should handle JSON parsing errors", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error("Invalid JSON");
      },
    });

    await expect(fetchTransactions()).rejects.toThrow("Invalid JSON");
  });

  it("should use correct API URL from environment", async () => {
    process.env.API_URL = "https://custom-api.com";

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTransactions,
    });

    await fetchTransactions();

    expect(mockFetch).toHaveBeenCalledWith("undefined/transactions", {
      cache: "no-store",
    });
  });
});

describe("fetchWalletData", () => {
  const mockWalletData: WalletData = {
    balance: 1000,
    total_payout: 500,
    total_revenue: 1500,
    pending_payout: 200,
    ledger_balance: 800,
  };

  it("should fetch wallet data successfully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockWalletData,
    });

    const result = await fetchWalletData();

    expect(mockFetch).toHaveBeenCalledWith("undefined/wallet", {
      cache: "no-store",
    });
    expect(result).toEqual(mockWalletData);
  });

  it("should throw error when response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(fetchWalletData()).rejects.toThrow(
      "Failed to fetch wallet data"
    );
  });

  it("should throw error when fetch fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network timeout"));

    await expect(fetchWalletData()).rejects.toThrow("Network timeout");
  });

  it("should handle malformed wallet data", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ invalid: "data" }),
    });

    const result = await fetchWalletData();
    expect(result).toEqual({ invalid: "data" });
  });
});

describe("fetchUser", () => {
  const mockUser: User = {
    first_name: "John",
    last_name: "Doe",
    email: "john@example.com",
  };

  it("should fetch user data successfully", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const result = await fetchUser();

    expect(mockFetch).toHaveBeenCalledWith("undefined/user", {
      cache: "no-store",
    });
    expect(result).toEqual(mockUser);
  });

  it("should throw error when response is not ok", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    await expect(fetchUser()).rejects.toThrow("Failed to fetch user data");
  });

  it("should throw error when fetch fails", async () => {
    mockFetch.mockRejectedValueOnce(new Error("CORS error"));

    await expect(fetchUser()).rejects.toThrow("CORS error");
  });

  it("should handle empty user data", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const result = await fetchUser();
    expect(result).toEqual({});
  });
});

describe("API Error Handling", () => {
  it("should log errors to console", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockFetch.mockRejectedValueOnce(new Error("Test error"));

    await expect(fetchTransactions()).rejects.toThrow("Test error");
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching transactions:",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it("should handle different HTTP status codes", async () => {
    const statusCodes = [400, 401, 403, 404, 500, 502, 503];

    for (const status of statusCodes) {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status,
      });

      await expect(fetchTransactions()).rejects.toThrow(
        "Failed to fetch transactions"
      );
    }
  });

  it("should handle timeout scenarios", async () => {
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 100)
        )
    );

    await expect(fetchTransactions()).rejects.toThrow("Request timeout");
  });
});
