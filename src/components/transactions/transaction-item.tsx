import { cn, formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Transaction } from "@/types";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const formattedDate = formatDate(transaction.date);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "bg-[#E3FCF2] size-10 rounded-full flex items-center justify-center",
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
            width={20}
            height={20}
            className="object-contain"
          />
        </div>

        <div>
          <h5 className="text-[#131316] text-[16px] font-medium">
            {transaction.metadata?.product_name ??
              (transaction.type === "withdrawal"
                ? "Cash withdrawal"
                : "Deposit")}
          </h5>
          <p
            className={cn(
              "text-[#56616B] text-[14px] font-medium",
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

      <div>
        <h5 className="text-[#131316] text-[16px] font-bold">
          USD {Number(transaction.amount).toFixed(2)}
        </h5>
        <p className="text-[#56616B] text-[14px] font-medium">
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
