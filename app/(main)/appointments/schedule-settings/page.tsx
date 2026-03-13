import { AppointmentSettings } from "@/components/main/booking/settings/appointmentSettings";
import GoBackBtn from "@/components/ui/goBackBtn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schdule Settings",
};

export default async function page() {
  return (
    <main className="space-y-5 p-5">
      <GoBackBtn className="outline-btn btn" title="Back" />
      <h4>Schedule Settings</h4>
      <AppointmentSettings />
    </main>
  );
}
