import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

interface NoFilterProps {
  onClearFilters: () => void;
}

const NoFilter = ({ onClearFilters }: NoFilterProps) => {
  return (
    <div className="w-[400px] space-y-5 mx-auto">
      <Image src="/no-filter.svg" alt="no-filter" width={50} height={50} />
      <h2 className="text-[#131316] text-[28px] font-bold">
        No matching transaction found for the selected filter
      </h2>

      <p className="text-[#56616B] text-[16px] font-medium">
        Change your filters to see more results, or add a new product.
      </p>

      <Button
        className="bg-[#EFF1F6] hover:bg-[#EFF1F6] text-[#131316] px-4 rounded-full font-semibold h-12 text-[16px]"
        onClick={onClearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default NoFilter;
