
import { EditPayoutForm } from "./payoutForms";


export const WalletBalance = () => {
  return (
    <ul className="grid grid-cols-1  lg:grid-cols-2 justify-between gap-3 ">
      <li className="bg-white p-5 rounded-2xl">
        <p className="text-grey-400 text-sm">Wallet Balance</p>
        <h4 className="font-semibold">$20.50</h4>
      </li>
      <li className="flex justify-between bg-white p-5 rounded-2xl ">
        <div>
          <p className="text-grey-400 text-sm">Payout Account</p>
          <h4 className="font-semibold">0265505279 - GT Bank</h4>
        </div>
        <EditPayoutForm />
      </li>


    </ul>
  );
};

