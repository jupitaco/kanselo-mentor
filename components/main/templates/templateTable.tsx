"use client";
import { EmptyState } from "@/components/ui/emptyState";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { usePaginationContext } from "@/context/paginateContext";
import { templateColData } from "@/mock";
import { TemplateType } from "@/types/template";
import React from "react";

export const TemplateTable = () => {
  const { data, isPending } = usePaginationContext();

  if (data?.assets?.length === 0) {
    return (
      <EmptyState
        title="No Data"
        subTitle={`All templates will appear here when they are available.`}
        className="card m-9 min-h-[70vh] bg-white py-10"
      />
    );
  }

  return (
    <>
      {isPending ? (
        <TableSkeleton columns={6} />
      ) : (
        <TableComponent
          title="Templates"
          columns={templateColData}
          data={data?.assets as TemplateType[]}
          containerClassName="!p-0"
        />
      )}

      <TablePagination />
    </>
  );
};
