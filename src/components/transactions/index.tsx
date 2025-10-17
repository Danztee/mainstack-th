"use client";

import React, { useState } from "react";
import TransactionItem from "./transaction-item";
import { Button } from "../ui/button";
import { ChevronDownIcon, DownloadIcon } from "lucide-react";
import FilterDialog from "../dialogs/filter-dialog";

interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions = ({ transactions }: TransactionsProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#131316] text-[24px] font-bold">
            {Number(transactions.length).toLocaleString()} Transactions
          </h2>
          <p className="text-[#56616B] text-[16px] font-medium">
            Your transactions for the last 7 days
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="lg"
            className="px-2 bg-[#EFF1F6] hover:bg-[#EFF1F6] text-[#131316] rounded-full font-semibold"
            onClick={() => setIsFilterOpen(true)}
          >
            Filter <ChevronDownIcon className="size-4" />
          </Button>
          <Button
            size="lg"
            className="px-2 bg-[#EFF1F6] hover:bg-[#EFF1F6] text-[#131316] rounded-full font-semibold"
          >
            Export List <DownloadIcon className="size-4" />
          </Button>
        </div>
      </div>

      <hr className="text-[#EFF1F6] mt-4" />

      <div className="mt-6 space-y-5">
        {transactions.map((transaction, index) => (
          <TransactionItem key={index} transaction={transaction} />
        ))}
      </div>

      <FilterDialog open={isFilterOpen} onOpenChange={setIsFilterOpen} />
    </section>
  );
};

export default Transactions;
