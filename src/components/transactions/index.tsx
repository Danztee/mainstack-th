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
    <section className="">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-[#131316] text-[20px] sm:text-[24px] font-bold">
            {Number(filteredTransactions.length).toLocaleString()} Transactions
          </h2>
          <p className="text-[#56616B] text-[14px] sm:text-[16px] font-medium">
            {getFilterDescription(appliedFilters, transactions.length)}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            size="lg"
            className="px-2 rounded-full font-semibold bg-[#EFF1F6] hover:bg-[#EFF1F6] text-[#131316] text-[12px] sm:text-[14px]"
            onClick={() => {
              setDraftFilters({ ...appliedFilters });
              setIsFilterOpen(true);
            }}
          >
            Filter{" "}
            {getActiveFiltersCount(appliedFilters) > 0 && (
              <>
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 bg-[#131316] text-white rounded-full text-[12px] font-medium px-1.5">
                  {getActiveFiltersCount(appliedFilters)}
                </span>
              </>
            )}
            <ChevronDownIcon className="size-4" />
          </Button>
          <Button
            size="lg"
            className="px-2 bg-[#EFF1F6] hover:bg-[#EFF1F6] text-[#131316] rounded-full font-semibold text-[12px] sm:text-[14px]"
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
            <span className="hidden sm:inline">Export List</span>
            <span className="sm:hidden">Export</span>
            <DownloadIcon className="size-4" />
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
