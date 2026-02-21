import { BookCallForm } from "@/components/main/booking/bookingsComponents";
import { ErrorUI } from "@/components/ui/emptyState";
import GoBackBtn from "@/components/ui/goBackBtn";
import { getBookingByIdApi } from "@/services/apis/bookings.api";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rsp = await getBookingByIdApi(slug);

  if (!rsp?.ok) {
    return (
      <ErrorUI
        code={rsp?.body?.code}
        message={rsp?.body?.message}
        className="min-h-[80vh] pt-8"
      />
    );
  }

  const booking = rsp?.body?.data;

  return (
    <main className="space-y-5 p-5">
      <GoBackBtn className="outline-btn btn" title="Back" />
      <section className="w-full max-w-2xl space-y-8 rounded-xl bg-white p-4">
        <h4 className="font-semibold">Call Information</h4>
        <BookCallForm {...booking} />
      </section>
    </main>
  );
}
