import { Transaction, WalletData } from "@/types";

const API_BASE_URL = "https://fe-task-api.mainstack.io";

export async function fetchTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`, {});

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function fetchWalletData(): Promise<WalletData> {
  try {
    const response = await fetch(`${API_BASE_URL}/wallet`, {});

    if (!response.ok) {
      throw new Error("Failed to fetch wallet data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw error;
  }
}
