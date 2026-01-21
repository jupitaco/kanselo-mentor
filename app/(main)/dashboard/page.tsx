import { Appointments } from "@/components/main/dashboard/appointments";
import RecentBookings from "@/components/main/dashboard/recentBookings";
import { Stats } from "@/components/main/dashboard/stats";
import { Welcome } from "@/components/main/dashboard/welcome";

export default function Page() {
  return (
    <main className="flex h-[calc(100vh-var(--main-header-height))] flex-wrap overflow-y-auto lg:overflow-hidden">
      <section className="no-scrollbar h-auto flex-1 space-y-8 overflow-y-auto p-5 pb-10 lg:h-screen lg:pb-40">
        <Welcome />
        <Stats />

        <section className="space-y-6 rounded-xl bg-white p-5">
          <article>
            <h4>Recent Consultations</h4>
            <p className="text-grey-400 text-sm">
              View your most recent consultations
            </p>
          </article>
          <RecentBookings />
        </section>
      </section>

      <Appointments />
    </main>
  );
}
