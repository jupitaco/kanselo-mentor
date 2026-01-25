import RenderBookingByStatus from "@/components/main/booking/completedBooking";
import Button from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import React, { use } from "react";
import { IoSettingsOutline } from "react-icons/io5";

export const metadata: Metadata = { title: "Appointments" };

const tabData = [
  { label: "New", path: "all" },
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
      <header className="grid grid-cols-1 lg:grid-cols-3 items-center justify-between gap-4">
        <article className="flex-1 space-y-2">
          <h4>New appointments</h4>
          <p>Manage your appointments</p>
        </article>

        <ul className="card flex min-h-10 w-full items-center justify-between gap-1 p-1 lg:w-fit">
          {tabData.map(({ label, path }, idx) => (
            <li key={idx}>
              <Link
                href={`/appointments?tab=${path}`}
                className={`text-xs font-medium ${activeTab === path ? "bg-primary rounded-lg text-white" : ""} px-4 md:px-7 py-2`}
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
            className="outline-btn min-h-[38px]! bg-grey-100 text-grey-500! py-0! text-xs! w-full lg:w-fit">
            <IoSettingsOutline />
            Schedule setting
          </Button>
        </div>
      </header>

      <RenderBookingByStatus />
    </main>
  );
}
