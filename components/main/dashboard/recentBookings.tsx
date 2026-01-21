'use client'
import { bookingAssets, recentBookingColData } from "@/mock";
import React from "react";
import TableComponent from "@/components/ui/tableComponent/tableComponent";

export default function RecentBookings() {
  return (
    <TableComponent
      title="Booking & Scheduling"
      columns={recentBookingColData}
      data={bookingAssets}
    />
  );
}
