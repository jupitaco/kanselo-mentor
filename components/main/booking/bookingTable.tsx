"use client";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import { bookingAssets, bookingColData } from "@/mock";
import React from "react";

export default function BookingTable() {
  return (
    <section>
      <TableComponent
        title="Booking & Scheduling"
        columns={bookingColData}
        data={bookingAssets}
      />
    </section>
  );
}
