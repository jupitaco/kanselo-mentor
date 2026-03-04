import RenderBookingByStatus from "@/components/main/booking/renderBookingByStatus";
import Button from "@/components/ui/button";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { SearchParams } from "@/types/global";
import { Metadata } from "next";
import Link from "next/link";
import React, { Suspense, use } from "react";
import { IoSettingsOutline } from "react-icons/io5";

export const metadata: Metadata = { title: "Appointments" };

const tabData = [
  { label: "New", path: "pending" },
  { label: "Completed", path: "completed" },
  { label: "Cancelled", path: "cancelled" },
  { label: "Expired", path: "expired" },
];

export default function Pages({ searchParams }: SearchParams) {
  const { tab, page } = use(searchParams);
  const activeTab = tab || "pending";

  return (
    <main className="space-y-14 p-5">
      <header className="grid grid-cols-1 items-center justify-between gap-4 lg:grid-cols-3">
        <article className="flex-1 space-y-2">
          <h4>New appointments</h4>
          <p>Manage your appointments</p>
        </article>

        <ul className="card flex min-h-10 w-full items-center justify-between gap-1 p-1 lg:w-fit">
          {tabData.map(({ label, path }, idx) => (
            <li key={idx}>
              <Link
                href={`/appointments?tab=${path}`}
                className={`text-xs font-medium ${activeTab === path ? "bg-primary rounded-lg text-white" : ""} px-4 py-2`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex justify-end">
          <Button
            link
            href="/appointments/schedule-settings"
            className="outline-btn bg-grey-100 text-grey-500! min-h-[38px]! w-full py-0! text-xs! lg:w-fit"
          >
            <IoSettingsOutline />
            Schedule setting
          </Button>
        </div>
      </header>

      <Suspense fallback={<TableSkeleton />}>
        <RenderBookingByStatus status={activeTab} page={page} />
      </Suspense>
    </main>
  );
}
