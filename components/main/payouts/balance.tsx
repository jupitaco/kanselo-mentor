import { getCurrentUserApi } from "@/services/apis/auth.api";
import { ManagePayoutForm } from "./payoutForms";
import { formatNumInThousands } from "@/utils/helper";
import { ErrorUI } from "@/components/ui/emptyState";

export const WalletBalance = async () => {
  const rsp = await getCurrentUserApi();

  if (!rsp?.ok) {
    return <ErrorUI code={rsp?.body?.code} message={rsp?.body?.message} />;
  }

  const { walletBalance, payoutAccount } = rsp?.body?.data;

  return (
    <ul className="grid grid-cols-1 justify-between gap-3 lg:grid-cols-2">
      <li className="rounded-2xl bg-white p-5">
        <p className="text-grey-400 text-sm">Wallet Balance</p>
        <h4 className="font-semibold">
          ${formatNumInThousands(walletBalance)}
        </h4>
      </li>
      {payoutAccount ? (
        <li className="flex flex-wrap justify-between gap-4 rounded-2xl bg-white p-5">
          <div>
            <p className="text-grey-400 text-sm">Payout Account</p>
            <h4 className="font-semibold">
              {payoutAccount?.accountNumber} - {payoutAccount?.bankName}
            </h4>
          </div>
          <ManagePayoutForm payout={payoutAccount} />
        </li>
      ) : (
        <li className="flex flex-wrap justify-between gap-4 rounded-2xl bg-white p-5">
          <div>
            <p className="text-grey-400 text-sm">Payout Account</p>
            <h4 className="font-semibold">-</h4>
          </div>
          <ManagePayoutForm />
        </li>
      )}
    </ul>
  );
};
