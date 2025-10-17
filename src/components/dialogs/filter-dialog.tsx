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
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type FilterPeriod = "today" | "last7days" | "thisMonth" | "last3Months";

const FilterDialog = ({ open, onOpenChange }: FilterDialogProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod | null>(
    null
  );
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [isFromCalendarOpen, setIsFromCalendarOpen] = useState(false);
  const [isToCalendarOpen, setIsToCalendarOpen] = useState(false);

  const filterButtons = [
    { id: "today" as FilterPeriod, label: "Today" },
    { id: "last7days" as FilterPeriod, label: "Last 7 Days" },
    { id: "thisMonth" as FilterPeriod, label: "This Month" },
    { id: "last3Months" as FilterPeriod, label: "Last 3 Months" },
  ];

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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
