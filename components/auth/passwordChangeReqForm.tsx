"use client";
import React, { useActionState, useEffect, useState } from "react";
import FormInput from "@/components/ui/formInput";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import { ActionFormStatus } from "@/types/global";
import { forgotPasswordRequestAction } from "@/libs/actions/auth.actions";
import { handleError, handleSuccess } from "@/utils/helper";

const PasswordChangeReqForm = () => {
  const { push } = useRouter();
  const [formData, setFormData] = useState('');

  const { setUserData } = useAuthContext();

  const initialStatus: ActionFormStatus = {
    error: false,
    message: '',
  };

  const [state, formAction, isPending] = useActionState(
    forgotPasswordRequestAction,
    initialStatus,
  );


  useEffect(() => {
    if (state?.error) {
      handleError(state?.message);
    } else if (state?.message) {
      setUserData((prev) => ({
        ...prev,
        email: formData,
      }));
      handleSuccess(
        state?.message,
        push,
        `/forgot-password-code?email=${formData}`,
      );
    }
  }, [state, push, formData, setUserData]);

  return (
    <form
      action={formAction}
    >
      <article className="mt-5 w-full">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          onChange={(e) => setFormData(e.target.value)}
          required
        />
      </article>
      <article className="mt-10">
        <Button
          className="pry-btn w-full"
          type="submit"
          loading={isPending}
        >
          Continue
        </Button>
      </article>
    </form>
  );
};

export default PasswordChangeReqForm;
