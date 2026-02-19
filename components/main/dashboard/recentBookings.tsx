import React from "react";
import BookingTable from "../booking/bookingTable";
import { getRecentBookingsApi } from "@/services/apis/bookings.api";
import { ErrorUI } from "@/components/ui/emptyState";
import { PaginationProvider } from "@/context/paginateContext";

export default async function RecentBookings() {
  const rsp = await getRecentBookingsApi();

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
  }

  const { bookings, page: currentPage, limit, total } = rsp?.body?.data;
  const bookingsData = {
    page: currentPage,
    total,
    limit,
    assets: bookings,
  };

  return (
    <PaginationProvider data={bookingsData}>
      <BookingTable status="recent" />
    </PaginationProvider>
  );
}
