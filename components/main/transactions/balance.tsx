"use client";
import Button from "@/components/ui/button";
import SelectInput from "@/components/ui/formInput/select/selectInput";
import { walletFilterData } from "@/mock";
import { BalanceIcon } from "@/public/svgs/svgs";
import { FaPlus } from "react-icons/fa6";

export const WalletBalance = () => {
  return (
    <section className="flex flex-wrap justify-between gap-3 rounded-2xl bg-white p-5">
      <article className="space-y-3">
        <div className="flex gap-3">
          <BalanceIcon />
          <div>
            <p className="text-grey-400 text-sm">Total Balance</p>
            <h4 className="font-semibold">₦10,000.05</h4>
          </div>
        </div>

        <Button className="pry-btn">
          <FaPlus /> Top-up Wallet
        </Button>
      </article>

      <WalletFilter />
    </section>
  );
};

export const WalletFilter = () => {
  return (
    <div className="flex items-center gap-3">
      <SelectInput
        name="filter"
        placeholder="Select"
        data={walletFilterData}
        className="h-9! min-h-8! min-w-24 rounded-xl! text-xs!"
        value=""
        onChange={() => {}}
      />
    </div>
  );
};
