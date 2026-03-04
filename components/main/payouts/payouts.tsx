import { getAllTransactionsApi } from "@/services/apis/payout.api";
import React from "react";
import { TransactionTable } from "./payoutTable";
import { PaginationProvider } from "@/context/paginateContext";
import { SearchPageParams } from "@/types/global";
import { ErrorUI } from "@/components/ui/emptyState";

export default async function Payouts({
  params,
}: {
  params: SearchPageParams;
}) {
  const rsp = await getAllTransactionsApi(params?.page || "1");

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
  }

  const { transactions, page, limit, total } = rsp?.body?.data;

  const payoutData = {
    page,
    total,
    limit,
    assets: transactions,
  };

  return (
    <PaginationProvider data={payoutData}>
      <TransactionTable />
    </PaginationProvider>
  );
}
