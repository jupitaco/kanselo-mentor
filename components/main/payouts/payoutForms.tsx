'use client'

import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import { DialogClose, DialogFooter } from "@/components/ui/modals/dialog";
import ModalWrapper from "@/components/ui/modals/modalWrapper";
import { useModalContext } from "@/context/modalContext";
import bank from "@/utils/banks.json"


export const WithdrawalForm = () => {

  const { isOpen, openModal } = useModalContext()

  return (
    <>
      <Button className="pry-btn" onClick={() => openModal("withdrawal")}  >Withdrawal</Button>
      {isOpen['withdrawal'] && <ModalWrapper
        id="withdrawal"
        title="Withdraw"
        subtitle="Note: Withdrawals are processed within 24 hours"
        headerClass="items-center"
      >

        <form className="space-y-5">
          <FormInput
            id="amount"
            name="amount"
            type="number"
            label="Amount"
            placeholder="Enter amount"
            required
          />

          <DialogFooter className="grid grid-cols-1 lg:grid-cols-2">
            <DialogClose asChild>
              <Button className="outline-btn ">Cancel</Button>
            </DialogClose>
            <Button className="pry-btn" type="submit">Withdraw</Button>
          </DialogFooter>
        </form>
      </ModalWrapper>}
    </>

  );
};

export const EditPayoutForm = () => {

  const { isOpen, openModal } = useModalContext()

  return (
    <>
      <Button className="alt-btn" onClick={() => openModal("payout")}  >Edit</Button>
      {isOpen['payout'] && <ModalWrapper
        id="payout"
        title="Edit Payout Account"
        subtitle=""
        headerClass="items-center"
      >

        <form className="space-y-5">
          <FormInput
            id="acountNumber"
            name="acountNumber"
            type="number"
            label="Account Number"
            placeholder="Enter account number"
            required
          />
          <FormInput
            id="bankCode"
            name="bankCode"
            type="shadSelect"
            label="Bank"
            shadcnSelectData={bank}
            value={""}
            placeholder="Select bank"
            required
          />
          <FormInput
            id="accountName"
            name="accountName"
            type="text"
            label="Account Name"
            placeholder="Enter account name"
            required
          />

          <DialogFooter className="grid grid-cols-1 lg:grid-cols-2">
            <DialogClose asChild>
              <Button className="outline-btn ">Cancel</Button>
            </DialogClose>
            <Button className="pry-btn" type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </ModalWrapper>}
    </>

  );
};

