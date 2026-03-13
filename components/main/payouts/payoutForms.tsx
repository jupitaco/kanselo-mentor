"use client";

import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import { DialogClose, DialogFooter } from "@/components/ui/modals/dialog";
import ModalWrapper from "@/components/ui/modals/modalWrapper";
import { useModalContext } from "@/context/modalContext";
import {
  createPayoutAccountAction,
  widthdrawalAction,
} from "@/libs/actions/payout.actions";
import { PayoutSchema, PayoutTypeValues } from "@/schemas/payout.schemas";
import { PayoutType } from "@/types/payout";
import bank from "@/utils/banks.json";
import { handleError, handleSuccess } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { SyntheticEvent, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

export const WithdrawalForm = () => {
  const { isOpen, openModal, closeModal } = useModalContext();
  const [isPending, startTransition] = useTransition();

  const [amount, setAmount] = useState("");

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const rsp = await widthdrawalAction({ amount: parseFloat(amount) });
      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal("withdrawal");
      }
    });
  };

  return (
    <>
      <Button
        className="pry-btn w-full md:w-fit"
        onClick={() => openModal("withdrawal")}
      >
        Withdraw
      </Button>
      {isOpen["withdrawal"] && (
        <ModalWrapper
          id="withdrawal"
          title="Withdraw"
          subtitle="Note: Withdrawals are processed within 24 hours"
          headerClass="items-center"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
              id="amount"
              name="amount"
              type="number"
              label="Amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <DialogFooter className="grid grid-cols-1 lg:grid-cols-2">
              <DialogClose asChild>
                <Button className="outline-btn">Cancel</Button>
              </DialogClose>
              <Button className="pry-btn" type="submit" loading={isPending}>
                Withdraw
              </Button>
            </DialogFooter>
          </form>
        </ModalWrapper>
      )}
    </>
  );
};

export const ManagePayoutForm = ({ payout }: { payout?: PayoutType }) => {
  const { isOpen, openModal, closeModal } = useModalContext();

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<PayoutTypeValues>({
    resolver: zodResolver(PayoutSchema),
    defaultValues: {
      bankName: payout?.bankName || "",
      accountName: payout?.accountName || "",
      accountNumber: payout?.accountNumber || "",
    },
  });

  const onSubmit = async (data: PayoutTypeValues) => {
    const rsp = await createPayoutAccountAction(data);
    if (rsp?.error) {
      handleError(rsp?.message);
    } else {
      handleSuccess(rsp?.message);
      closeModal("payout");
    }
  };

  return (
    <>
      {payout ? (
        <Button
          className="alt-btn w-full md:w-fit"
          onClick={() => openModal("payout")}
        >
          Edit
        </Button>
      ) : (
        <Button
          className="pry-btn w-full md:w-fit"
          onClick={() => openModal("payout")}
        >
          Add Account
        </Button>
      )}
      {isOpen["payout"] && (
        <ModalWrapper
          id="payout"
          title={payout ? "Edit Payout Account" : "Add Payout Account"}
          subtitle=""
          headerClass="items-center"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FormInput
              id="acountNumber"
              type="number"
              label="Account Number"
              placeholder="Enter account number"
              {...register("accountNumber")}
              error={errors.accountNumber?.message}
            />
            <Controller
              name="bankName"
              control={control}
              render={({ field }) => (
                <FormInput
                  id="bankName"
                  type="shadSelect"
                  label="Bank"
                  shadcnSelectData={bank?.map((item) => {
                    return { label: item?.label, value: item?.label };
                  })}
                  value={field?.value}
                  placeholder="Select bank"
                  onSelectItem={field.onChange}
                  error={errors.bankName?.message}
                />
              )}
            />
            <FormInput
              id="accountName"
              type="text"
              label="Account Name"
              placeholder="Enter account name"
              {...register("accountName")}
              error={errors.accountName?.message}
            />

            <DialogFooter className="grid grid-cols-1 lg:grid-cols-2">
              <DialogClose asChild>
                <Button className="outline-btn">Cancel</Button>
              </DialogClose>
              <Button className="pry-btn" type="submit" loading={isSubmitting}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </ModalWrapper>
      )}
    </>
  );
};
