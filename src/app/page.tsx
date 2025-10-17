import Image from "next/image";
import Transactions from "@/components/transactions";
import { fetchTransactions, fetchWalletData } from "@/lib/api";
import { Transaction } from "@/types";

export default async function Home() {
  // Fetch data from APIs in parallel
  const [transactions, data] = await Promise.all([
    fetchTransactions(),
    fetchWalletData(),
  ]);

  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <section className="grid grid-cols-3 gap-10">
        <aside className="col-span-2"></aside>

        <aside className="col-span-1 space-y-8">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[#56616B] text-[16px] font-medium">
                Ledger Balance:{" "}
              </p>

              <Image src="/info.svg" alt="info" width={20} height={20} />
            </div>

            <h2 className="font-bold text-[#131316] text-[28px]">
              USD {Number(data.ledger_balance).toFixed(2)}
            </h2>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-[#56616B] text-[16px] font-medium">
                Total Payout:{" "}
              </p>

              <Image src="/info.svg" alt="info" width={20} height={20} />
            </div>

            <h2 className="font-bold text-[#131316] text-[28px]">
              USD {Number(data.total_payout).toFixed(2)}
            </h2>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-[#56616B] text-[16px] font-medium">
                Total Revenue:{" "}
              </p>

              <Image src="/info.svg" alt="info" width={20} height={20} />
            </div>

            <h2 className="font-bold text-[#131316] text-[28px]">
              USD {Number(data.total_revenue).toFixed(2)}
            </h2>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-[#56616B] text-[16px] font-medium">
                Pending Payout:{" "}
              </p>

              <Image src="/info.svg" alt="info" width={20} height={20} />
            </div>

            <h2 className="font-bold text-[#131316] text-[28px]">
              USD {Number(data.pending_payout).toFixed(2)}
            </h2>
          </div>
        </aside>
      </section>

      <Transactions transactions={transactions as Transaction[]} />
    </div>
  );
}
