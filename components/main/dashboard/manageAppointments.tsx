"use client";

import { EmptyState, ErrorUI } from "@/components/ui/emptyState";
import { Calendar } from "@/components/ui/formInput/datePicker/calendar";
import Skeleton from "@/components/ui/skeleton/skeleton";
import { BookingType } from "@/types/bookings";
import { formatDateToLocale } from "@/utils/helper";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, Suspense, useTransition } from "react";

export const AppointmentsCalendarWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const selectedDate = searchParams.get("selectedDate") || "";

  const updatePath = (date: string) => {
    const params = new URLSearchParams(searchParams);

    if (date) {
      params.set("selectedDate", date);
    } else {
      params.set("selectedDate", formatDateToLocale(new Date()));
    }

    startTransition(() => {
      return replace(`${pathname}?${params}`);
    });
  };

  return (
    <aside className="border-grey-100 custom-scrollbar h-auto w-full overflow-y-auto border-l bg-white p-4 pb-40 lg:h-screen lg:w-[30%]">
      <div className="space-y-6">
        <h1 className="text-lg font-bold">Upcoming Appointments</h1>

        {/* Calendar */}
        <article className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate ? new Date(selectedDate) : new Date()}
            onSelect={(date) => date && updatePath(formatDateToLocale(date))}
            className="w-full rounded-lg p-4"
          />
        </article>

        {isPending ? <AppointmentSkeleton /> : children}
      </div>
    </aside>
  );
};

export const AppointmentsCalendar = ({ data }: { data: BookingType[] }) => {
  return (
    <Suspense>
      <AppointmentsCalendarWrapper>
        <ul className="divide-Line space-y-4 divide-y">
          {data.map((appointment) => (
            <li key={appointment._id} className="flex items-center gap-4 pb-4">
              <Image
                src={appointment.userId?.profilePhoto}
                alt={appointment.userId?.fullName}
                className="rounded object-cover"
                width={48}
                height={48}
              />
              <div className="flex-1">
                <h5 className="font-medium">{appointment.userId?.fullName}</h5>
                <p className="text-grey-300 text-xs">
                  {appointment.selectedTime} - {appointment.selectedEndTime}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </AppointmentsCalendarWrapper>
    </Suspense>
  );
};

export const AppointmentErrorUI = ({
  body,
}: {
  body: { code: number; message: string };
}) => {
  return (
    <Suspense>
      <AppointmentsCalendarWrapper>
        <ErrorUI code={body?.code} message={body?.message} />
      </AppointmentsCalendarWrapper>
    </Suspense>
  );
};

export const AppointmentNoDataUI = () => {
  return (
    <Suspense>
      <AppointmentsCalendarWrapper>
        <EmptyState title="No Data" subTitle="No upcoming appointments" />
      </AppointmentsCalendarWrapper>
    </Suspense>
  );
};

export const AppointmentSkeleton = () => {
  return (
    <ul className="divide-Line space-y-4 divide-y">
      {Array.from({ length: 6 }).map((appointment, idx) => (
        <li key={idx} className="flex items-center gap-4 pb-4">
          <Skeleton className="size-12! rounded-full!" />
          <div className="flex-1">
            <Skeleton className="h-4!" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-3! w-10!" /> -{" "}
              <Skeleton className="h-3! w-10!" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
