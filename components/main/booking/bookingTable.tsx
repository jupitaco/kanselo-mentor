"use client";
import { EmptyState } from "@/components/ui/emptyState";
import TableComponent, {
  Column,
} from "@/components/ui/tableComponent/tableComponent";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { usePaginationContext } from "@/context/paginateContext";
import {
  bookingColData,
  completedBookingColData,
  newBookingColData,
} from "@/mock";
import { BookingType } from "@/types/bookings";
import React from "react";

export default function BookingTable({ status }: { status: string }) {
  const { data, isPending } = usePaginationContext();

  const colList: {
    [key: string]: Column<
      BookingType & {
        action?: React.ReactNode;
      }
    >[];
  } = {
    pending: newBookingColData,
    completed: completedBookingColData,
    cancelled: bookingColData,
    recent: bookingColData,
  };

  if (data?.assets?.length === 0) {
    return (
      <EmptyState
        title="No Data"
        subTitle={`All ${status} appointments will appear here when they are available.`}
        className="card py-10"
      />
    );
  }

  return (
    <>
      {isPending ? (
        <TableSkeleton columns={6} />
      ) : (
        <TableComponent
          title="Booking & Scheduling"
          columns={colList[status]}
          data={data?.assets as BookingType[]}
        />
      )}

      {status !== "recent" && <TablePagination />}
    </>
  );
}
