import React from "react";
import BookingTable from "./bookingTable";
import { PaginationProvider } from "@/context/paginateContext";
import { ErrorUI } from "@/components/ui/emptyState";
import { getAllBookingsApi } from "@/services/apis/bookings.api";

export default async function RenderBookingByStatus({
  page,
  status,
}: {
  page: string;
  status: string;
}) {
  const rsp = await getAllBookingsApi({
    page: page || "1",
    status: status === "all" ? "" : status?.toUpperCase(),
  });

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
  console.log(">>>>>", bookings);
  return (
    <PaginationProvider data={bookingsData}>
      <BookingTable status={status} />
    </PaginationProvider>
  );
}
