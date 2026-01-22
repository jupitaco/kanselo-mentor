

import { BalanceIcon, IncomeIcon, UserIcon } from "@/public/svgs/svgs";


export const TemplateStats = () => {

  return (
    <ul className=" rounded-xl bg-white p-5 grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
      <li className="flex gap-2 items-center">
        <UserIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Templates</small>
          <h4 className="font-semibold ">5</h4>
        </div>
      </li>
      <li className="flex gap-2 items-center">
        <IncomeIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Income</small>
          <h4 className="font-semibold">$251.70</h4>
        </div>
      </li>
      <li className="flex gap-2 items-center">
        <BalanceIcon />
        <div className="space-y-3">
          <small className="text-grey-300">Total Sales</small>
          <h4 className="font-semibold">250</h4>
        </div>
      </li>

    </ul>
  );
};
