"use client";
import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import React, { FormEvent, useState } from "react";
import StrongPassword from "../ui/strongPassword";
import { useGlobalHooks } from "@/hooks/globalHooks";
import { useAuthContext } from "@/context/authContext";

const initialValues = {
  uniqueVerificationCode: "",
  newPassword: "",
  confirmPassword: "",
};

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const { errors,   } = useGlobalHooks();
  // const { push } = useRouter();
  const { userData } = useAuthContext();

  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // const initialStatus: ActionFormStatus = {
  //   error: false,
  //   message: '',
  // };

  // const [state, formAction, isPending] = useActionState(
  //   passwordResetAction,
  //   initialStatus,
  // );

  // useEffect(() => {
  //   if (state?.error) {
  //     handleError('Reset Password', state?.message);
  //   } else if (!state?.error && state?.message) {
  //     handleSuccess(
  //       'Reset Password',
  //       state?.message,
  //       push,
  //       '/password-success',
  //     );
  //   }
  // }, [state, push]);

  // useEffect(() => {
  //   if (formData?.newPassword !== formData?.confirmPassword) {
  //     setErrors({ error: true, errMessage: "Password doesn't match" });
  //   } else {
  //     setErrors({ error: false, errMessage: '' });
  //   }
  // }, [formData, setErrors]);

  return (
    <form
    // action={formAction}
    >
      <article className="mt-5 w-full">
        <FormInput
          id="uniqueVerificationCode"
          name="uniqueVerificationCode"
          type="hidden"
          defaultValue={userData?.code}
        />
        <FormInput
          id="newPassword"
          name="newPassword"
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
          {formData?.newPassword !== "" && (
            <StrongPassword password={formData?.newPassword} className="mt-2" />
          )}
        </div>
      </article>
      <article className="mt-5 w-full">
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
      </article>
      <article className="mt-10">
        <Button
          type="submit"
          className="pry-btn w-full"
          // loading={isPending}
        >
          Reset Password
        </Button>
      </article>
    </form>
  );
};

export default ResetPasswordForm;
