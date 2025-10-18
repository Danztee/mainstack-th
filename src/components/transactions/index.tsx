"use client";

import React, { useState, useMemo, useEffect } from "react";
import TransactionItem from "./transaction-item";
import { Button } from "../ui/button";
import { ChevronDownIcon, DownloadIcon } from "lucide-react";
import FilterDialog from "../dialogs/filter-dialog";
import { Transaction } from "@/types";
import {
  FilterState,
  filterTransactions,
  getActiveFiltersCount,
  getFilterDescription,
} from "@/lib/filters";
import NoFilter from "./no-filter";

interface TransactionsProps {
  transactions: Transaction[];
  onFilteredTransactionsChange?: (filteredTransactions: Transaction[]) => void;
}

const Transactions = ({
  transactions,
  onFilteredTransactionsChange,
}: TransactionsProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    period: null,
    dateFrom: undefined,
    dateTo: undefined,
    statuses: [],
    types: [],
  });
  const [draftFilters, setDraftFilters] = useState<FilterState>({
    period: null,
    dateFrom: undefined,
    dateTo: undefined,
    statuses: [],
    types: [],
  });

  const filteredTransactions = useMemo(() => {
    return filterTransactions(transactions, appliedFilters);
  }, [transactions, appliedFilters]);

  useEffect(() => {
    if (onFilteredTransactionsChange) {
      onFilteredTransactionsChange(filteredTransactions);
    }
  }, [filteredTransactions, onFilteredTransactionsChange]);

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#131316] text-[24px] font-bold">
            {Number(filteredTransactions.length).toLocaleString()} Transactions
          </h2>
          <p className="text-[#56616B] text-[16px] font-medium">
            {getFilterDescription(appliedFilters, transactions.length)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="lg"
            className={`px-2 rounded-full font-semibold ${
              getActiveFiltersCount(appliedFilters) > 0
                ? "bg-[#131316] hover:bg-[#131316] text-white"
                : "bg-[#EFF1F6] hover:bg-[#EFF1F6] text-[#131316]"
            }`}
            onClick={() => {
              setDraftFilters({ ...appliedFilters });
              setIsFilterOpen(true);
            }}
          >
            Filter{" "}
            {getActiveFiltersCount(appliedFilters) > 0 &&
              `(${getActiveFiltersCount(appliedFilters)})`}{" "}
            <ChevronDownIcon className="size-4" />
          </Button>
          <Button
            size="lg"
            className="px-2 bg-[#EFF1F6] hover:bg-[#EFF1F6] text-[#131316] rounded-full font-semibold"
            onClick={() => {
              const csvContent = [
                [
                  "Date",
                  "Type",
                  "Status",
                  "Amount",
                  "Name",
                  "Email",
                  "Country",
                  "Product Name",
                ].join(","),
                ...filteredTransactions.map((transaction) =>
                  [
                    transaction.date,
                    transaction.type,
                    transaction.status,
                    transaction.amount,
                    transaction.metadata?.name || "",
                    transaction.metadata?.email || "",
                    transaction.metadata?.country || "",
                    transaction.metadata?.product_name || "",
                  ]
                    .map((field) => `"${field}"`)
                    .join(",")
                ),
              ].join("\n");

              const blob = new Blob([csvContent], { type: "text/csv" });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `transactions_${
                new Date().toISOString().split("T")[0]
              }.csv`;
              a.click();
              window.URL.revokeObjectURL(url);
            }}
          >
            Export List <DownloadIcon className="size-4" />
          </Button>
        </div>
      </div>

      <hr className="text-[#EFF1F6] mt-4" />

      <div className="mt-6 space-y-5">
        {filteredTransactions.length === 0 ? (
          <div className="py-10">
            <NoFilter
              onClearFilters={() => {
                const clearedFilters = {
                  period: null,
                  dateFrom: undefined,
                  dateTo: undefined,
                  statuses: [],
                  types: [],
                };
                setAppliedFilters(clearedFilters);
                setDraftFilters(clearedFilters);
              }}
            />
          </div>
        ) : (
          filteredTransactions.map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
          ))
        )}
      </div>

      <FilterDialog
        open={isFilterOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDraftFilters({ ...appliedFilters });
          }
          setIsFilterOpen(open);
        }}
        filters={draftFilters}
        onFiltersChange={setDraftFilters}
        onApply={(filters) => {
          setAppliedFilters(filters);
          setIsFilterOpen(false);
        }}
      />
    </section>
  );
};

export default Transactions;
