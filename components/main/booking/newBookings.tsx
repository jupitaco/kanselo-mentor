import React, { Suspense } from "react";
import BookingTable from "./bookingTable";

export default function NewBookings() {
  return (
    <Suspense>
      <BookingTable />
    </Suspense>
  );
}
