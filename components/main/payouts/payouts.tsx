import { getPayoutAccounts } from "@/services/apis/payout.api";
import React from "react";
import { PayoutTable } from "./payoutTable";
import { PaginationProvider } from "@/context/paginateContext";
import EmptyState from "@/components/ui/emptyState";
import { SearchPageParams } from "@/types/global";

export default async function Payouts({
  params,
}: {
  params: SearchPageParams;
}) {
  const rsp = await getPayoutAccounts(params?.page || "1");

  if (!rsp?.ok) {
    return <EmptyState title="Error" subTitle={rsp?.body?.message} />;
  }

  const { withdrawals, page, limit, total } = rsp?.body?.data;

  const payoutData = {
    page,
    total,
    limit,
    assets: withdrawals,
  };

  return (
    <PaginationProvider data={payoutData}>
      <PayoutTable />
    </PaginationProvider>
  );
}
