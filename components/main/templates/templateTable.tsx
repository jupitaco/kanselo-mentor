"use client";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import TablePagination from "@/components/ui/tableComponent/tablePagination";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { usePaginationContext } from "@/context/paginateContext";
import { templateColData } from "@/mock";
import { TemplateType } from "@/types/template";
import React from "react";

export const TemplateTable = () => {
  const { data, isPending } = usePaginationContext();

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
