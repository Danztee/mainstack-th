import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Transaction } from "@/types";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const formattedDate = formatDate(transaction.date);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <div
          className={cn(
            "bg-[#E3FCF2] size-8 sm:size-10 rounded-full flex items-center justify-center flex-shrink-0",
            transaction.type === "deposit" ? "bg-[#E3FCF2]" : "bg-[#FFEFEF]"
          )}
        >
          <Image
            src={
              transaction.type === "deposit"
                ? "/deposit.svg"
                : "/withdrawal.svg"
            }
            alt="transaction"
            width={16}
            height={16}
            className="object-contain sm:w-5 sm:h-5"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h5 className="text-[#131316] text-[14px] sm:text-[16px] font-medium truncate">
            {transaction.metadata?.product_name ??
              (transaction.type === "withdrawal"
                ? "Cash withdrawal"
                : "Deposit")}
          </h5>
          <p
            className={cn(
              "text-[#56616B] text-[12px] sm:text-[14px] font-medium truncate",
              !transaction.metadata?.name && transaction.status === "successful"
                ? "text-[#0EA163]"
                : !transaction.metadata?.name &&
                  transaction.status === "pending"
                ? "text-[#A77A07]"
                : !transaction.metadata?.name && transaction.status === "failed"
                ? "text-[#FF0000]"
                : "text-[#56616B]"
            )}
          >
            {transaction.metadata?.name ?? transaction?.status}
          </p>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <h5 className="text-[#131316] text-[14px] sm:text-[16px] font-bold">
          USD {Number(transaction.amount).toFixed(2)}
        </h5>
        <p className="text-[#56616B] text-[12px] sm:text-[14px] font-medium">
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
