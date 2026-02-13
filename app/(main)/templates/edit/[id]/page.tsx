import { EditTemplate } from "@/components/main/templates/templateForm";
import EmptyState from "@/components/ui/emptyState";
import GoBackBtn from "@/components/ui/goBackBtn";
import { getTemplateById } from "@/services/apis/template.api";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = { title: "Edit Templates" };

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rsp = await getTemplateById(id);

  if (!rsp?.ok) {
    return <EmptyState title="Error" subTitle={rsp?.body?.message} />;
  }

  const templateData = rsp?.body?.data;

  return (
    <main className="space-y-7 p-5">
      <GoBackBtn className="outline-btn btn" title="Back" />
      <h4>Edit Template</h4>
      <section className="w-full max-w-2xl rounded-xl bg-white px-5 py-10">
        <EditTemplate templateData={templateData} />
      </section>
    </main>
  );
}
