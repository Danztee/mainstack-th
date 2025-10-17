"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import {
  FilterState,
  FilterPeriod,
  TransactionStatus,
  TransactionType,
} from "@/lib/filters";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onApply: (filters: FilterState) => void;
}

const FilterDialog = ({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onApply,
}: FilterDialogProps) => {
  const [isFromCalendarOpen, setIsFromCalendarOpen] = useState(false);
  const [isToCalendarOpen, setIsToCalendarOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const filterButtons = [
    { id: "today" as FilterPeriod, label: "Today" },
    { id: "last7days" as FilterPeriod, label: "Last 7 Days" },
    { id: "thisMonth" as FilterPeriod, label: "This Month" },
    { id: "last3Months" as FilterPeriod, label: "Last 3 Months" },
  ];

  const statusOptions = [
    { id: "successful" as TransactionStatus, label: "Successful" },
    { id: "pending" as TransactionStatus, label: "Pending" },
    { id: "failed" as TransactionStatus, label: "Failed" },
  ];

  const typeOptions = [
    { id: "storeTransactions" as TransactionType, label: "Store Transactions" },
    { id: "getTipped" as TransactionType, label: "Get Tipped" },
    { id: "withdrawal" as TransactionType, label: "Withdrawal" },
    { id: "chargebacks" as TransactionType, label: "Chargebacks" },
    { id: "cashbacks" as TransactionType, label: "Cashbacks" },
    { id: "referAndEarn" as TransactionType, label: "Refer & Earn" },
  ];

  const handleStatusToggle = (status: TransactionStatus) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    updateFilters({ statuses: newStatuses });
  };

  const handleTypeToggle = (type: TransactionType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    updateFilters({ types: newTypes });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[470px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-[#131316] text-[24px]">
            Filter
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="pb-4 space-y-6">
          <div className="flex items-center gap-2">
            {filterButtons.map((filter) => (
              <Button
                key={filter.id}
                className={`h-[36px] flex-1 rounded-full font-semibold border border-[#EFF1F6] bg-transparent ${
                  filters.period === filter.id
                    ? "bg-[#131316] hover:bg-[#131316] text-white"
                    : "bg-transparent hover:bg-[#EFF1F6] text-[#131316]"
                }`}
                onClick={() => updateFilters({ period: filter.id })}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-[#131316]">Date Range</label>
            <div className="flex items-center gap-2 mt-2">
              <Button
                size="lg"
                variant="outline"
                className={`h-[48px] flex-1 justify-between text-left font-normal rounded-lg ${
                  isFromCalendarOpen
                    ? "border-[#131316] border-3"
                    : "border-[#EFF1F6]"
                } ${
                  filters.dateFrom || isFromCalendarOpen
                    ? "bg-white hover:bg-white"
                    : "bg-[#EFF1F6] hover:bg-[#EFF1F6]"
                }`}
                onClick={() => {
                  setIsToCalendarOpen(false);
                  setIsFromCalendarOpen(!isFromCalendarOpen);
                }}
              >
                <span>
                  {filters.dateFrom ? format(filters.dateFrom, "PPP") : "From"}
                </span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className={`h-[48px] flex-1 justify-between text-left font-normal rounded-lg ${
                  isToCalendarOpen
                    ? "border-[#131316] border-3"
                    : "border-[#EFF1F6]"
                } ${
                  filters.dateTo || isToCalendarOpen
                    ? "bg-white hover:bg-white"
                    : "bg-[#EFF1F6] hover:bg-[#EFF1F6]"
                }`}
                onClick={() => {
                  setIsFromCalendarOpen(false);
                  setIsToCalendarOpen(!isToCalendarOpen);
                }}
              >
                <span>
                  {filters.dateTo ? format(filters.dateTo, "PPP") : "To"}
                </span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </div>

            {(isFromCalendarOpen || isToCalendarOpen) && (
              <div className="mt-4 w-full">
                <Calendar
                  mode="single"
                  selected={
                    isFromCalendarOpen ? filters.dateFrom : filters.dateTo
                  }
                  onSelect={
                    isFromCalendarOpen
                      ? (date) => updateFilters({ dateFrom: date })
                      : (date) => updateFilters({ dateTo: date })
                  }
                  className="w-full rounded-2xl"
                  style={{
                    boxShadow:
                      "0px 6px 12px 0px #5C738314, 0px 4px 8px 0px #5C738314",
                  }}
                />
              </div>
            )}
          </div>

          {/* Transaction Type Multi-Select */}
          <div className="space-y-2">
            <label className="font-semibold text-[#131316]">
              Transaction Type
            </label>

            <div className="mt-2"></div>
            <Button
              size="lg"
              variant="outline"
              className={`h-[48px] w-full justify-between text-left font-normal rounded-lg ${
                isTypeDropdownOpen
                  ? "border-[#131316] border-3"
                  : "border-[#EFF1F6]"
              } ${
                filters.types.length > 0 || isTypeDropdownOpen
                  ? "bg-white hover:bg-white"
                  : "bg-[#EFF1F6] hover:bg-[#EFF1F6]"
              }`}
              onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
            >
              <span>
                {filters.types.length === 0
                  ? "Select Type"
                  : filters.types.length === 1
                  ? typeOptions.find((t) => t.id === filters.types[0])?.label
                  : filters.types
                      .map(
                        (typeId) =>
                          typeOptions.find((t) => t.id === typeId)?.label
                      )
                      .join(", ")}
              </span>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>

            {isTypeDropdownOpen && (
              <div
                className="mt-4 w-full p-4 rounded-2xl bg-white"
                style={{
                  boxShadow:
                    "0px 6px 12px 0px #5C738314, 0px 4px 8px 0px #5C738314",
                }}
              >
                <div className="space-y-3">
                  {typeOptions.map((type) => (
                    <div
                      key={type.id}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                      onClick={() => handleTypeToggle(type.id)}
                    >
                      <Checkbox
                        checked={filters.types.includes(type.id)}
                        onChange={() => handleTypeToggle(type.id)}
                      />
                      <span className="text-sm font-medium">{type.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-[#131316]">
              Transaction Status
            </label>

            <div className="mt-2"></div>
            <Button
              variant="outline"
              size="lg"
              className={`h-[48px] w-full justify-between text-left font-normal rounded-lg ${
                isStatusDropdownOpen
                  ? "border-[#131316] border-3"
                  : "border-[#EFF1F6]"
              } ${
                filters.statuses.length > 0 || isStatusDropdownOpen
                  ? "bg-white hover:bg-white"
                  : "bg-[#EFF1F6] hover:bg-[#EFF1F6]"
              }`}
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            >
              <span>
                {filters.statuses.length === 0
                  ? "Select Status"
                  : filters.statuses.length === 1
                  ? statusOptions.find((s) => s.id === filters.statuses[0])
                      ?.label
                  : filters.statuses
                      .map(
                        (statusId) =>
                          statusOptions.find((s) => s.id === statusId)?.label
                      )
                      .join(", ")}
              </span>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>

            {isStatusDropdownOpen && (
              <div
                className="mt-4 w-full p-4 rounded-2xl bg-white"
                style={{
                  boxShadow:
                    "0px 6px 12px 0px #5C738314, 0px 4px 8px 0px #5C738314",
                }}
              >
                <div className="space-y-3">
                  {statusOptions.map((status) => (
                    <div
                      key={status.id}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                      onClick={() => handleStatusToggle(status.id)}
                    >
                      <Checkbox
                        checked={filters.statuses.includes(status.id)}
                        onChange={() => handleStatusToggle(status.id)}
                      />
                      <span className="text-sm font-medium">
                        {status.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer with Clear and Apply buttons */}
          <div className="flex items-center gap-3 pt-20">
            <Button
              variant="outline"
              size="lg"
              className="h-12 flex-1 border-[#EFF1F6] text-[#131316] hover:bg-[#EFF1F6] rounded-full font-semibold"
              onClick={() => {
                const clearedFilters = {
                  period: null,
                  dateFrom: undefined,
                  dateTo: undefined,
                  statuses: [],
                  types: [],
                };
                onFiltersChange(clearedFilters);
                onApply(clearedFilters);
                setIsFromCalendarOpen(false);
                setIsToCalendarOpen(false);
                setIsStatusDropdownOpen(false);
                setIsTypeDropdownOpen(false);
              }}
            >
              Clear
            </Button>
            <Button
              size="lg"
              className={`h-12 flex-1 rounded-full font-semibold disabled:bg-[#DBDEE5] disabled:text-[#fff] ${
                filters.period ||
                filters.dateFrom ||
                filters.dateTo ||
                filters.statuses.length > 0 ||
                filters.types.length > 0
                  ? "bg-[#131316] hover:bg-[#131316] text-white"
                  : "bg-[#EFF1F6] text-[#56616B] cursor-not-allowed"
              }`}
              disabled={
                !filters.period &&
                !filters.dateFrom &&
                !filters.dateTo &&
                filters.statuses.length === 0 &&
                filters.types.length === 0
              }
              onClick={() => {
                onApply(filters);
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
