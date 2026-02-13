import { CreateTemplate } from "@/components/main/templates/templateForm";
import GoBackBtn from "@/components/ui/goBackBtn";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = { title: "Create Templates" };

export default function page() {
  return (
    <main className="space-y-7 p-5">
      <GoBackBtn className="outline-btn btn" title="Back" />
      <h4>Add Template</h4>
      <section className="w-full max-w-2xl rounded-xl bg-white px-5 py-10">
        <CreateTemplate />
      </section>
    </main>
  );
}
