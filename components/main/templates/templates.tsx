import { PaginationProvider } from "@/context/paginateContext";
import { TemplateTable } from "./templateTable";
import { getAllTemplates } from "@/services/apis/template.api";
import { SearchPageParams } from "@/types/global";
import { ErrorUI } from "@/components/ui/emptyState";

export default async function Templates({
  params,
}: {
  params: SearchPageParams;
}) {
  const rsp = await getAllTemplates(params?.page || "1");

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
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
