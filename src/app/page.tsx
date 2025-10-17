import Image from "next/image";
import Transactions from "@/components/transactions";

export default function Home() {
  const data = {
    balance: 750.56,
    total_payout: 500,
    total_revenue: 1250.56,
    pending_payout: 0,
    ledger_balance: 500,
  };

  const transactions = [
    {
      amount: 500,
      metadata: {
        name: "John Doe",
        type: "digital_product",
        email: "johndoe@example.com",
        quantity: 1,
        country: "Nigeria",
        product_name: "Rich Dad Poor Dad",
      },
      payment_reference: "c3f7123f-186f-4a45-b911-76736e9c5937",
      status: "successful",
      type: "deposit",
      date: "2022-03-03",
    },
    {
      amount: 400,
      metadata: {
        name: "Fibi Brown",
        type: "coffee",
        email: "fibibrown@example.com",
        quantity: 8,
        country: "Ireland",
      },
      payment_reference: "d28db158-0fc0-40cd-826a-4243923444f7",
      status: "successful",
      type: "deposit",
      date: "2022-03-02",
    },
    {
      amount: 350.56,
      metadata: {
        name: "Delvan Ludacris",
        type: "webinar",
        email: "johndoe@example.com",
        quantity: 1,
        country: "Kenya",
        product_name: "How to build an online brand",
      },
      payment_reference: "73f45bc0-8f41-4dfb-9cae-377a32b71d1e",
      status: "successful",
      type: "deposit",
      date: "2022-03-01",
    },
    {
      amount: 300,
      status: "successful",
      type: "withdrawal",
      date: "2022-03-01",
    },
    {
      amount: 300,
      metadata: {
        name: "Shawn kane",
        type: "webinar",
        email: "shawnkane@example.com",
        quantity: 1,
        country: "United Kingdom",
        product_name: "Support my outreach",
      },
      payment_reference: "c22055e5-8f47-4059-a1e9-51124d325992",
      status: "successful",
      type: "deposit",
      date: "2022-02-28",
    },
    {
      amount: 200,
      status: "successful",
      type: "withdrawal",
      date: "2022-03-01",
    },
    {
      amount: 200,
      metadata: {
        name: "Ada Eze",
        type: "webinar",
        email: "adaeze1@example.com",
        quantity: 1,
        country: "Nigeria",
        product_name: "Learn how to pitch your idea",
      },
      payment_reference: "5b2988d9-395e-4a91-984b-8b02f0d12df9",
      status: "successful",
      type: "deposit",
      date: "2022-02-20",
    },
  ];

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

      <Transactions transactions={transactions} />
    </div>
  );
}
