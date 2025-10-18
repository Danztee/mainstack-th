"use server";

import { Transaction, WalletData, User } from "@/types";

const API_BASE_URL = process.env.API_URL;

export async function fetchTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      cache: "no-store", // Ensure fresh data on each request
    });

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
    const response = await fetch(`${API_BASE_URL}/wallet`, {
      cache: "no-store", // Ensure fresh data on each request
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wallet data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    throw error;
  }
}

export async function fetchUser(): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      cache: "no-store", // Ensure fresh data on each request
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
