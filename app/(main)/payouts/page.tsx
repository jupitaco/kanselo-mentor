import { WalletBalance } from "@/components/main/transactions/balance";
import RenderTransaction from "@/components/main/transactions/renderTransaction";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = { title: "Wallet & Transactions" };

export default function Pages() {
  return (
    <main className="mx-auto max-w-xl space-y-7 p-5">
      <WalletBalance />
      <section className="space-y-5 rounded-2xl bg-white p-5">
        <h4 className="font-semibold">Transactions</h4>
        <RenderTransaction />
      </section>
    </main>
  );
}
