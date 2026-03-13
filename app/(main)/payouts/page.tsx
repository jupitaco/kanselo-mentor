import { WalletBalance } from "@/components/main/payouts/balance";
import { WithdrawalForm } from "@/components/main/payouts/payoutForms";
import Payouts from "@/components/main/payouts/payouts";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { SearchParams } from "@/types/global";
import { Metadata } from "next";
import React, { Suspense, use } from "react";

export const metadata: Metadata = { title: "Payouts" };

export default function Pages({ searchParams }: SearchParams) {
  const p = use(searchParams);
  return (
    <main className="space-y-7 p-5">
      <WalletBalance />
      <section className="space-y-5 rounded-2xl bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="font-semibold">Transactions</h4>
          <WithdrawalForm />
        </div>

        <Suspense fallback={<TableSkeleton columns={6} />}>
          <Payouts params={p} />
        </Suspense>
      </section>
    </main>
  );
}
