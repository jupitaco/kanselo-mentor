import { PaginationProvider } from "@/context/paginateContext";
import { TemplateTable } from "./templateTable";
import { getAllTemplates } from "@/services/apis/template.api";
import { SearchPageParams } from "@/types/global";
import EmptyState from "@/components/ui/emptyState";

export default async function Templates({
  params,
}: {
  params: SearchPageParams;
}) {
  const rsp = await getAllTemplates(params?.page || "1");

  if (!rsp?.ok) {
    return <EmptyState title="Error" subTitle={rsp?.body?.message} />;
  }

  const { templates, page, limit, total } = rsp?.body?.data;
  const templateData = {
    page,
    total,
    limit,
    assets: templates,
  };

  return (
    <PaginationProvider data={templateData}>
      <TemplateTable />
    </PaginationProvider>
  );
}
