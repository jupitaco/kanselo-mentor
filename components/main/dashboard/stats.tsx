

import { IncomeIcon, UserIcon } from "@/public/svgs/svgs";


export const Stats = () => {

  return (
    <ul className="  rounded-xl bg-white p-5 grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
      <li className="flex gap-2 items-center">
        <UserIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Consultations</small>
          <h4 className="font-semibold ">5</h4>
        </div>
      </li>
      <li className="flex gap-2 items-center">
        <IncomeIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Income</small>
          <h4 className="font-semibold">$251.70</h4>
        </div>
      </li>

    </ul>
  );
};
