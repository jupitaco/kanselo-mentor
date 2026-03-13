import Appointments from "@/components/main/dashboard/appointments";
import {
  AppointmentsCalendarWrapper,
  AppointmentSkeleton,
} from "@/components/main/dashboard/manageAppointments";
import RecentBookings from "@/components/main/dashboard/recentBookings";
import {
  Stats,
  StatsSkeleton,
  Welcome,
  WelcomeSkeleton,
} from "@/components/main/dashboard/welcome";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { SearchParams } from "@/types/global";
import { Suspense, use } from "react";

export default function Page({ searchParams }: SearchParams) {
  const params = use(searchParams);
  return (
    <main className="flex h-[calc(100vh-var(--main-header-height))] flex-wrap overflow-y-auto lg:overflow-hidden">
      <section className="no-scrollbar h-auto flex-1 space-y-8 overflow-y-auto p-5 pb-10 lg:h-screen lg:pb-40">
        <Suspense fallback={<WelcomeSkeleton />}>
          <Welcome />
        </Suspense>

        <Suspense fallback={<StatsSkeleton />}>
          <Stats />
        </Suspense>

        <section className="space-y-6 rounded-xl bg-white p-5">
          <article>
            <h4>Recent Consultations</h4>
            <p className="text-grey-400 text-sm">
              View your most recent consultations
            </p>
          </article>
          <Suspense fallback={<TableSkeleton />}>
            <RecentBookings />
          </Suspense>
        </section>
      </section>

      <Suspense
        fallback={
          <AppointmentsCalendarWrapper>
            <AppointmentSkeleton />
          </AppointmentsCalendarWrapper>
        }
      >
        <Appointments {...params} />
      </Suspense>
    </main>
  );
}
