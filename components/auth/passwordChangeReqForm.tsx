"use client";
import React from "react";
import FormInput from "@/components/ui/formInput";
import Button from "@/components/ui/button";

const PasswordChangeReqForm = () => {
  // const { push } = useRouter();

  // const { setUserData } = useAuthContext();

  // const initialStatus: ActionFormStatus & { data: UserDataAndAccessToken } = {
  //   error: false,
  //   message: '',
  //   data: {} as UserDataAndAccessToken,
  // };

  // const [state, formAction, isPending] = useActionState(
  //   forgotPasswordRequestAction,
  //   initialStatus,
  // );

  // const [formData, setFormData] = useState('');

  // useEffect(() => {
  //   if (state?.error) {
  //     handleError('Reset Password Request', state?.message);
  //   } else if (state?.message) {
  //     setUserData((prev) => ({
  //       ...prev,
  //       email: formData,
  //     }));
  //     handleSuccess(
  //       'Reset Password Request',
  //       state?.message,
  //       push,
  //       `/forgot-password-code?email=${formData}`,
  //     );
  //   }
  // }, [state, push, formData, setUserData]);

  return (
    <form
    // action={formAction}
    >
      <article className="mt-5 w-full">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          required
        />
      </article>
      <article className="mt-10">
        <Button
          link
          href="/reset-password"
          className="pry-btn w-full"
          type="submit"
        >
          Continue
        </Button>
      </article>
    </form>
  );
};

export default PasswordChangeReqForm;
