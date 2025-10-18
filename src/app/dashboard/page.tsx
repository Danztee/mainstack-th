"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Transactions from "@/components/transactions";
import { fetchTransactions, fetchWalletData } from "@/lib/api";
import { Transaction } from "@/types";
import { Button } from "@/components/ui/button";
import { ChartLine } from "@/components/chart-line";
import { FullPageLoading } from "@/components/loading";

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [data, setData] = useState({
    balance: 0,
    total_payout: 0,
    total_revenue: 0,
    pending_payout: 0,
    ledger_balance: 0,
  });
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [transactionsData, walletData] = await Promise.all([
          fetchTransactions(),
          fetchWalletData(),
        ]);

        setTransactions(transactionsData);
        setData(walletData);
        setFilteredTransactions(transactionsData);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <FullPageLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-[1200px] mx-auto p-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h2 className="text-red-800 text-xl font-semibold mb-2">
              Error Loading Data
            </h2>
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <section className="grid grid-cols-3 gap-20">
        <aside className="col-span-2 space-y-4">
          <div className="flex gap-20 items-center">
            <div className="space-y-2">
              <p className="text-[#56616B] text-[16px] font-medium">
                Available Balance:
              </p>

              <h1 className="font-bold text-[#131316] text-[36px]">
                USD {Number(data.balance).toFixed(2)}
              </h1>
            </div>

            <Button className="rounded-full h-13 w-40 text-[16px]" size="lg">
              Withdraw
            </Button>
          </div>

          <ChartLine transactions={filteredTransactions} />
        </aside>

        <aside className="col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[#56616B] text-[16px] font-medium">
                Ledger Balance:{" "}
              </p>

              <Image src="/info.svg" alt="info" width={20} height={20} />
            </div>

            <h2 className="font-bold text-[#131316] text-[28px]">
              USD {Number(data.ledger_balance).toFixed(2)}
            </h2>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-[#56616B] text-[16px] font-medium">
                Total Payout:{" "}
              </p>

              <Image src="/info.svg" alt="info" width={20} height={20} />
            </div>

            <h2 className="font-bold text-[#131316] text-[28px]">
              USD {Number(data.total_payout).toFixed(2)}
            </h2>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-[#56616B] text-[16px] font-medium">
                Total Revenue:{" "}
              </p>

              <Image src="/info.svg" alt="info" width={20} height={20} />
            </div>

            <h2 className="font-bold text-[#131316] text-[28px]">
              USD {Number(data.total_revenue).toFixed(2)}
            </h2>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-[#56616B] text-[16px] font-medium">
                Pending Payout:{" "}
              </p>

              <Image src="/info.svg" alt="info" width={20} height={20} />
            </div>

            <h2 className="font-bold text-[#131316] text-[28px]">
              USD {Number(data.pending_payout).toFixed(2)}
            </h2>
          </div>
        </aside>
      </section>

      <Transactions
        transactions={transactions as Transaction[]}
        onFilteredTransactionsChange={setFilteredTransactions}
      />
    </div>
  );
}
