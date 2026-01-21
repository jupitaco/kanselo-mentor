"use client";

import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import StrongPassword from "@/components/ui/strongPassword";
import React, { FormEvent } from "react";
import { useState } from "react";

export const Security = () => {
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // const initialStatus: ActionFormStatus & { data: UserDataAndAccessToken } = {
  //   error: false,
  //   message: '',
  //   data: {} as UserDataAndAccessToken,
  // };

  // const [state, formAction, isPending] = useActionState(
  //   currentUserUpdatePasswordAction,
  //   initialStatus,
  // );

  // useEffect(() => {
  //   if (state?.error) {
  //     handleError('Change Password', state?.message);
  //   } else if (!state?.error && state?.message) {
  //     handleSuccess('Change Password', state?.message);

  //     // Defer state updates to avoid synchronous cascading renders in React effects
  //     setTimeout(() => {
  //       setFormData({
  //         oldPassword: '',
  //         newPassword: '',
  //         confirmPassword: '',
  //       });
  //       setEdit(false);
  //     }, 0);
  //   }
  // }, [state]);

  return (
    <form
      // action={formAction}
      className="space-y-4"
    >
      <section className="space-y-4">
        <FormInput
          id="oldPassword"
          name="oldPassword"
          type="text"
          label="Old Password"
          placeholder="Enter"
          defaultValue={formData?.oldPassword}
          onChange={handleChange}
          disabled={!edit}
        />
        <FormInput
          id="newPassword"
          name="newPassword"
          type="password"
          label="New Password"
          placeholder="Enter"
          onChange={handleChange}
          defaultValue={formData?.newPassword}
          disabled={!edit}
        />

        {edit && formData?.newPassword !== "" && (
          <StrongPassword password={formData?.newPassword} />
        )}

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm New Password"
          placeholder="Enter"
          defaultValue={formData?.confirmPassword}
          onChange={handleChange}
          disabled={!edit}
        />

        <div className="mt-9 flex items-center justify-end pt-5">
          {edit ? (
            <div className="flex gap-3">
              <Button
                className="outline-btn"
                type="button"
                onClick={() => setEdit(!edit)}
              >
                Cancel
              </Button>
              <Button
                className="pry-btn"
                type="submit"
                // loading={isPending}
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button
                className="outline-btn text-center"
                onClick={() => setEdit(!edit)}
                type="button"
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      </section>
    </form>
  );
};
