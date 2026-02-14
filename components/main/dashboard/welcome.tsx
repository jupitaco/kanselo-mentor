import Skeleton from "@/components/ui/skeleton/skeleton";
import { IncomeIcon, UserIcon } from "@/public/svgs/svgs";
import { getCurrentUserApi } from "@/services/apis/auth.api";
import { getBookingStatsApi } from "@/services/apis/bookings.api";
import { UserData } from "@/types/auths";
import { formatNumInThousands } from "@/utils/helper";

export const Welcome = async () => {
  const rsp = await getCurrentUserApi();
  const currentUser = rsp?.ok ? rsp?.body?.data : ({} as UserData);
  return (
    <article className="space-y-3">
      <h3 className="font-bold">Welcome, {currentUser?.fullName}</h3>
      <p className="text-grey-400 font-medium">Consultations made simple</p>
    </article>
  );
};

export const Stats = async () => {
  const rsp = await getBookingStatsApi();
  const statsData = rsp?.ok ? rsp?.body?.data : null;

  return (
    <ul className="grid grid-cols-1 items-center gap-4 rounded-xl bg-white p-5 lg:grid-cols-2">
      <li className="flex items-center gap-2">
        <UserIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Consultations</small>
          <h4 className="font-semibold">
            {statsData?.totalConsultations || 0}
          </h4>
        </div>
      </li>
      <li className="flex items-center gap-2">
        <IncomeIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Income</small>
          <h4 className="font-semibold">
            ${formatNumInThousands(statsData?.totalConsultations || 0)}
          </h4>
        </div>
      </li>
    </ul>
  );
};

export const WelcomeSkeleton = async () => {
  return (
    <article className="space-y-3">
      <h3 className="flex items-center gap-4 font-bold">
        Welcome, <Skeleton className="h-4! w-20!" />{" "}
      </h3>
      <p className="text-grey-400 font-medium">Consultations made simple</p>
    </article>
  );
};

export const StatsSkeleton = async () => {
  return (
    <ul className="grid grid-cols-1 items-center gap-4 rounded-xl bg-white p-5 lg:grid-cols-2">
      <li className="flex items-center gap-2">
        <UserIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Consultations</small>
          <Skeleton className="h-4!" />
        </div>
      </li>
      <li className="flex items-center gap-2">
        <IncomeIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Income</small>
          <h4 className="flex items-center gap-4 font-semibold">
            $<Skeleton className="h-4! w-20!" />
          </h4>
        </div>
      </li>
    </ul>
  );
};
