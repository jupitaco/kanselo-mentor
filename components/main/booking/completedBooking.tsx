import React, { Suspense } from "react";
import BookingTable from "./bookingTable";

export default function CompletedBookings() {
  return (
    <Suspense>
      <BookingTable />
    </Suspense>
  );
}
