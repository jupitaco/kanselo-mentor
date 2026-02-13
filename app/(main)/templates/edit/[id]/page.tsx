import { EditTemplate } from "@/components/main/templates/templateForm";
import GoBackBtn from "@/components/ui/goBackBtn";
import { Metadata } from "next";
import React, { use } from "react";
export const metadata: Metadata = { title: "Edit Templates" };

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <main className="space-y-7 p-5">
      <GoBackBtn className="outline-btn btn" title="Back" />
      <h4>Edit Template</h4>
      <section className="w-full max-w-2xl rounded-xl bg-white px-5 py-10">
        <EditTemplate id={id} />
      </section>
    </main>
  );
}
