"use client";
import { EmptyState } from "@/components/ui/emptyState";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { usePaginationContext } from "@/context/paginateContext";
import { payoutColData, transactioncolData } from "@/mock";
import { PayoutWithdrawalType, TransactionType } from "@/types/payout";
import React from "react";

export const PayoutTable = () => {
  const { data, isPending } = usePaginationContext();

  if (data?.assets?.length === 0) {
    return (
      <EmptyState
        title="No Transactions"
        subTitle={`All transactions will appear here when they are available.`}
        className="card m-9 min-h-[70vh] bg-white py-10"
      />
    );
  }

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

export const TransactionTable = () => {
  const { data, isPending } = usePaginationContext();

  if (data?.assets?.length === 0) {
    return (
      <EmptyState
        title="No Transactions"
        subTitle={`All transactions will appear here when they are available.`}
        className="card m-9 min-h-[70vh] bg-white py-10"
      />
    );
  }

  return (
    <>
      {isPending ? (
        <TableSkeleton columns={6} />
      ) : (
        <TableComponent
          title="Transactions"
          columns={transactioncolData}
          data={data?.assets as TransactionType[]}
          containerClassName="!p-0"
        />
      )}

      <TablePagination />
    </>
  );
};
