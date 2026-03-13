"use client";

import FormInput from "../ui/formInput";
import Link from "next/link";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import { ActionFormStatus } from "@/types/global";
import { UserData, UserDataAndAccessToken } from "@/types/auths";
import { useActionState, useEffect } from "react";
import { signInAction } from "@/libs/actions/auth.actions";
import { handleError, handleSuccess } from "@/utils/helper";
import { useAuthContext } from "@/context/authContext";

const SigninForm = ({ redirectPath }: { redirectPath: string }) => {
  const { push } = useRouter();
  const { setCurrentUserData } = useAuthContext();

  const initialStatus: ActionFormStatus & {
    data: { user: UserData };
  } = {
    error: false,
    message: "",
    data: {} as { user: UserData },
  };

  const [state, formAction, isPending] = useActionState(
    signInAction,
    initialStatus,
    "/",
  );

  useEffect(() => {
    if (state?.error) {
      handleError(state?.message);
    } else if (!state?.error && state?.message !== "") {
      if (state?.data?.user) {
        setCurrentUserData(state?.data?.user as UserDataAndAccessToken["user"]);
      }
      if (redirectPath) {
        handleSuccess(state?.message, push, redirectPath);
      } else {
        handleSuccess(state?.message, push, "/dashboard");
      }
    }
  }, [state, push, redirectPath]);

  return (
    <form action={formAction}>
      <section className="space-y-4">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email "
          required
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
        />
      </section>

      <section className="mt-3 flex w-full justify-end">
        <Link
          href="/forgot-password-request"
          className="text-primary text-sm font-medium"
        >
          Forgot password?
        </Link>
      </section>

      <section className="mt-10 mb-3">
        <Button className="pry-btn w-full" type="submit" loading={isPending}>
          Sign In
        </Button>
      </section>

      <article className="mt-4 w-full text-center">
        <h5 className="text-grey-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary">
            Register
          </Link>
        </h5>
      </article>
    </form>
  );
};

export default SigninForm;
