import { WalletBalance } from "@/components/main/payouts/balance";
import { WithdrawalForm } from "@/components/main/payouts/payoutForms";
import RenderTransaction from "@/components/main/payouts/renderTransactions";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = { title: "Payouts" };

export default function Pages() {
  return (
    <main className="space-y-7 p-5 ">
      <WalletBalance />
      <section className="space-y-5 rounded-2xl bg-white p-5">
        <div className="flex flex-wrap justify-between gap-3 items-center">
          <h4 className="font-semibold">Transactions</h4>
          <WithdrawalForm />
        </div>
        <RenderTransaction />
      </section>
    </main>
  );
}
