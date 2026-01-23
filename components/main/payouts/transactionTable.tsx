"use client";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import { transactionAssets, transactionolData } from "@/mock";
import React from "react";

export const TransactionTable = () => {
  return (
    <section>
      <TableComponent
        title="Transactions"
        columns={transactionolData}
        data={transactionAssets}
      />
    </section>
  );
};
