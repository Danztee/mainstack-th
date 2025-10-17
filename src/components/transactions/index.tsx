import React from "react";

const Transactions = () => {
  return (
    <section className="mt-10">
      <div>
        <h2 className="text-[#131316] text-[24px] font-bold">
          24 Transactions
        </h2>
        <p className="text-[#56616B] text-[16px] font-medium">
          Your transactions for the last 7 days
        </p>
      </div>

      <hr className="text-[#EFF1F6] mt-4" />

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-[#131316] text-[16px] font-medium">
              Psychology of Money{" "}
            </h5>
            <p className="text-[#56616B] text-[14px] font-medium">Roy Cash</p>
          </div>

          <div>
            <h5 className="text-[#131316] text-[16px] font-bold">USD 600</h5>
            <p className="text-[#56616B] text-[14px] font-medium">Roy Cash</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transactions;
