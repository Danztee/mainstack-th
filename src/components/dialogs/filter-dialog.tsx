"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { format } from "date-fns";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type FilterPeriod = "today" | "last7days" | "thisMonth" | "last3Months";
type TransactionStatus = "successful" | "pending" | "failed";
type TransactionType = "storeTransactions" | "getTipped" | "withdrawal" | "chargebacks" | "cashbacks" | "referAndEarn";

const FilterDialog = ({ open, onOpenChange }: FilterDialogProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod | null>(
    null
  );
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [isFromCalendarOpen, setIsFromCalendarOpen] = useState(false);
  const [isToCalendarOpen, setIsToCalendarOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<TransactionStatus[]>(
    []
  );
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<TransactionType[]>([]);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

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
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleTypeToggle = (type: TransactionType) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
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
        <div className="py-4 space-y-6">
          <div className="flex items-center gap-2">
            {filterButtons.map((filter) => (
              <Button
                key={filter.id}
                className={`flex-1 rounded-full font-semibold border border-[#EFF1F6] bg-transparent ${
                  selectedPeriod === filter.id
                    ? "bg-[#131316] hover:bg-[#131316] text-white"
                    : "bg-transparent hover:bg-[#EFF1F6] text-[#131316]"
                }`}
                onClick={() => setSelectedPeriod(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-[#131316]">Date Range</label>
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="outline"
                className={`flex-1 justify-between text-left font-normal rounded-lg ${
                  isFromCalendarOpen
                    ? "border-[#131316] border-3"
                    : "border-[#EFF1F6]"
                } ${
                  dateFrom || isFromCalendarOpen
                    ? "bg-white hover:bg-white"
                    : "bg-[#EFF1F6] hover:bg-[#EFF1F6]"
                }`}
                onClick={() => {
                  setIsToCalendarOpen(false);
                  setIsFromCalendarOpen(!isFromCalendarOpen);
                }}
              >
                <span>{dateFrom ? format(dateFrom, "PPP") : "From"}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className={`flex-1 justify-between text-left font-normal rounded-lg ${
                  isToCalendarOpen
                    ? "border-[#131316] border-3"
                    : "border-[#EFF1F6]"
                } ${
                  dateTo || isToCalendarOpen
                    ? "bg-white hover:bg-white"
                    : "bg-[#EFF1F6] hover:bg-[#EFF1F6]"
                }`}
                onClick={() => {
                  setIsFromCalendarOpen(false);
                  setIsToCalendarOpen(!isToCalendarOpen);
                }}
              >
                <span>{dateTo ? format(dateTo, "PPP") : "To"}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </div>

            {(isFromCalendarOpen || isToCalendarOpen) && (
              <div className="mt-4 w-full">
                <Calendar
                  mode="single"
                  selected={isFromCalendarOpen ? dateFrom : dateTo}
                  onSelect={isFromCalendarOpen ? setDateFrom : setDateTo}
                  initialFocus
                  className="w-full rounded-2xl"
                  style={{
                    boxShadow:
                      "0px 6px 12px 0px #5C738314, 0px 4px 8px 0px #5C738314",
                  }}
                />
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
              className={`w-full justify-between text-left font-normal rounded-lg ${
                isStatusDropdownOpen
                  ? "border-[#131316] border-3"
                  : "border-[#EFF1F6]"
              } ${
                selectedStatuses.length > 0 || isStatusDropdownOpen
                  ? "bg-white hover:bg-white"
                  : "bg-[#EFF1F6] hover:bg-[#EFF1F6]"
              }`}
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
            >
              <span>
                {selectedStatuses.length === 0
                  ? "Select Status"
                  : selectedStatuses.length === 1
                  ? statusOptions.find((s) => s.id === selectedStatuses[0])
                      ?.label
                  : selectedStatuses
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
                        checked={selectedStatuses.includes(status.id)}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
