"use client";
import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import React, { FormEvent, useActionState, useEffect, useState } from "react";
import StrongPassword from "../ui/strongPassword";
import { useGlobalHooks } from "@/hooks/globalHooks";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { ActionFormStatus } from "@/types/global";
import { passwordResetAction } from "@/libs/actions/auth.actions";
import { handleError, handleSuccess } from "@/utils/helper";

const initialValues = {
  code: "",
  password: "",
  confirmPassword: "",
};

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const { errors, setErrors } = useGlobalHooks();
  const { push } = useRouter();
  const { userData } = useAuthContext();

  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const initialStatus: ActionFormStatus = {
    error: false,
    message: '',
  };

  const [state, formAction, isPending] = useActionState(
    passwordResetAction,
    initialStatus,
  );

  useEffect(() => {
    if (state?.error) {
      handleError(state?.message);
    } else if (!state?.error && state?.message) {
      handleSuccess(
        state?.message,
        push,
        '/login',
      );
    }
  }, [state, push]);

  useEffect(() => {
    if (formData?.password !== formData?.confirmPassword) {
      setErrors({ error: true, errMessage: "Password doesn't match" });
    } else {
      setErrors({ error: false, errMessage: '' });
    }
  }, [formData, setErrors]);


  return (
    <form action={formAction} className="space-y-5">
      <FormInput
        id="code"
        name="code"
        type="hidden"
        defaultValue={userData?.code}
      />

      <FormInput
        id="email"
        name="email"
        type="hidden"
        defaultValue={userData?.email}
      />

      <FormInput
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        onChange={handleChange}
        required
      />

      <div className="mt-5 space-y-4">
        <small className="text-grey-400">
          Min 8 Characters with a combination of letters and numbers
        </small>
        {formData?.password !== "" && (
          <StrongPassword password={formData?.password} className="mt-2" />
        )}
      </div>

      <FormInput
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Enter your password"
        onChange={handleChange}
        error={errors?.error ? errors?.errMessage : ""}
        required
      />

      <article className="mt-10">
        <Button
          type="submit"
          className="pry-btn w-full"
          loading={isPending}
        >
          Reset Password
        </Button>
      </article>
    </form>
  );
};

export default ResetPasswordForm;
