"use client";
import TableComponent, { Column } from "@/components/ui/tableComponent/tableComponent";
import { bookingAssets, newBookingColData, completedBookingColData, cancelledBookingColData } from "@/mock";
import { BookingType } from "@/types/booking";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function BookingTable() {

  const searchParams = useSearchParams()
  const activetab = searchParams.get("tab") || "all"

  const colList: {
    [key: string]: Column<BookingType & {
      action?: React.ReactNode;
    }>[]
  } = {
    all: newBookingColData,
    completed: completedBookingColData,
    cancelled: cancelledBookingColData
  }

  return (

    <TableComponent
      title="Booking & Scheduling"
      columns={colList[activetab]}
      data={bookingAssets}
    />

  );
}
