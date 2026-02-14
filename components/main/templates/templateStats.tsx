import EmptyState from "@/components/ui/emptyState";
import Skeleton from "@/components/ui/skeleton/skeleton";
import { BalanceIcon, IncomeIcon, UserIcon } from "@/public/svgs/svgs";
import { getTemplateStats } from "@/services/apis/template.api";
import { formatNumInThousands } from "@/utils/helper";

export const TemplateStats = async () => {
  const rsp = await getTemplateStats();

  if (!rsp?.ok) {
    return <EmptyState title="Error" subTitle={rsp?.body?.message} />;
  }

  const { totalIncome, totalSales, totalTemplates } = rsp?.body?.data;

  return (
    <ul className="grid grid-cols-1 items-center gap-4 rounded-xl bg-white p-5 lg:grid-cols-3">
      <li className="flex items-center gap-2">
        <UserIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Templates</small>
          <h4 className="font-semibold">{totalTemplates}</h4>
        </div>
      </li>
      <li className="flex items-center gap-2">
        <IncomeIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Income</small>
          <h4 className="font-semibold">
            ${formatNumInThousands(totalIncome)}
          </h4>
        </div>
      </li>
      <li className="flex items-center gap-2">
        <BalanceIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Sales</small>
          <h4 className="font-semibold">{totalSales}</h4>
        </div>
      </li>
    </ul>
  );
};

export const TemplateStatSkeleton = () => {
  return (
    <ul className="grid grid-cols-1 items-center gap-4 rounded-xl bg-white p-5 lg:grid-cols-3">
      <li className="flex items-center gap-2">
        <UserIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Templates</small>
          <Skeleton className="h-4!" />
        </div>
      </li>
      <li className="flex items-center gap-2">
        <IncomeIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Income</small>
          <div className="flex items-center gap-4 font-semibold">
            $ <Skeleton className="h-4! w-20!" />
          </div>
        </div>
      </li>
      <li className="flex items-center gap-2">
        <BalanceIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Sales</small>
          <Skeleton className="h-4!" />
        </div>
      </li>
    </ul>
  );
};
