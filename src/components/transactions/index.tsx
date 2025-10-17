import React from "react";
import TransactionItem from "./transaction-item";

interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions = ({ transactions }: TransactionsProps) => {
  return (
    <section className="mt-10">
      <div>
        <h2 className="text-[#131316] text-[24px] font-bold">
          {Number(transactions.length).toLocaleString()} Transactions
        </h2>
        <p className="text-[#56616B] text-[16px] font-medium">
          Your transactions for the last 7 days
        </p>
      </div>

      <hr className="text-[#EFF1F6] mt-4" />

      <div className="mt-6 space-y-5">
        {transactions.map((transaction, index) => (
          <TransactionItem key={index} transaction={transaction} />
        ))}
      </div>
    </section>
  );
};

export default Transactions;
