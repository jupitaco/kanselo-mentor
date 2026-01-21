
import { BookCallForm, MenteeAvatar } from "@/components/main/booking/bookingsComponents";
import GoBackBtn from "@/components/ui/goBackBtn";
import { mentorsData } from "@/mock";
import { Mentor } from "@/types/global";
import React, { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const mentor = mentorsData.find((i) => i.id === slug) as Mentor;

  return (
    <main className="p-5 space-y-5">
      <GoBackBtn className="outline-btn btn" title="Back" />
      <section className="w-full space-y-8 rounded-xl bg-white p-4 max-w-2xl">
        <h4 className="font-semibold">Call Information</h4>
        <MenteeAvatar {...mentor} />
        <BookCallForm />
      </section>

    </main>
  );
}
