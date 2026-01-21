import React, { Suspense } from "react";
import BookingTable from "./bookingTable";

export default function RenderCancelledBookings() {
  return (
    <Suspense>
      <BookingTable />
    </Suspense>
  );
}
