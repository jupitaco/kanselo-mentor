import Templates from "@/components/main/templates/templates";
import {
  TemplateStats,
  TemplateStatSkeleton,
} from "@/components/main/templates/templateStats";
import Button from "@/components/ui/button";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { SearchParams } from "@/types/global";
import { Metadata } from "next";
import React, { Suspense, use } from "react";
import { LuCirclePlus } from "react-icons/lu";
export const metadata: Metadata = { title: "Templates" };

export default function Page({ searchParams }: SearchParams) {
  const p = use(searchParams);
  return (
    <main className="space-y-7 p-5">
      <Suspense fallback={<TemplateStatSkeleton />}>
        <TemplateStats />
      </Suspense>

      <section className="space-y-10 rounded-xl bg-white p-4">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <article className="space-y-2">
            <h4 className="font-semibold">All Templates</h4>
            <p>Manage your templates</p>
          </article>

          <Button
            link
            href="/templates/create"
            className="pry-btn w-full md:w-fit"
          >
            <LuCirclePlus /> Add New Template
          </Button>
        </header>

        <Suspense fallback={<TableSkeleton columns={6} />}>
          <Templates params={p} />
        </Suspense>
      </section>
    </main>
  );
}
