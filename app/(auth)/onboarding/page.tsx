import Onboarding from "@/components/auth/onboarding";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default function page() {
  return (
    <section className="space-y-8">
      <h1>Onboarding</h1>
      <h5 className="text-grey-400">
        Help us setup your Mentor profile
      </h5>

      <Onboarding />
    </section>
  );
}
