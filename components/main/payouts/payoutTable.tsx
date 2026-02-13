"use client";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { usePaginationContext } from "@/context/paginateContext";
import { payoutColData } from "@/mock";
import { PayoutWithdrawalType } from "@/types/payout";
import React from "react";

export const PayoutTable = () => {
  const { data, isPending } = usePaginationContext();

  return (
    <>
      {isPending ? (
        <TableSkeleton columns={6} />
      ) : (
        <TableComponent
          title="Payouts"
          columns={payoutColData}
          data={data?.assets as PayoutWithdrawalType[]}
          containerClassName="!p-0"
        />
      )}

      <TablePagination />
    </>
  );
};
