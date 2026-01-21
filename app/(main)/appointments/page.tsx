import RenderBookingByStatus from "@/components/main/booking/renderBookingByStatus";
import { Metadata } from "next";
import Link from "next/link";
import React, { use } from "react";

export const metadata: Metadata = { title: "Booking & Scheduling" };

const tabData = [
  { label: "All", path: "all" },
  { label: "Completed", path: "completed" },
  { label: "Cancelled", path: "cancelled" },
];

export default function Pages({
  searchParams,
}: {
  searchParams: Promise<{ tab: string }>;
}) {
  const { tab } = use(searchParams);

  const activeTab = tab || "all";
  return (
    <main className="space-y-14 p-5">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <article className="flex-1 space-y-2">
          <h4>Booking</h4>
          <p>Manage your bookings</p>
        </article>
        <ul className="card flex min-h-10 w-full items-center justify-between gap-1 p-1 lg:w-fit">
          {tabData.map(({ label, path }, idx) => (
            <li key={idx}>
              <Link
                href={`/booking-and-scheduling?tab=${path}`}
                className={`text-xs font-medium ${activeTab === path ? "bg-primary rounded-lg text-white" : ""} px-7 py-2`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      <RenderBookingByStatus />
    </main>
  );
}
