import React, { use } from "react";
import { Metadata } from "next";
import GoBackBtn from "@/components/ui/goBackBtn";
import { VerifyEmail } from "@/components/auth/verifyEmail";

export const metadata: Metadata = {
  title: "Forgot password request",
};

export default function Page({ searchParams }: { searchParams: Promise<{ email: string }> }) {

  const { email } = use(searchParams)

  return (
    <section className="space-y-10">
      <hgroup className="space-y-5">
        <GoBackBtn />
        <h1>Verify Email</h1>

        <h5 className='text-grey-400'>
          {' '}
          Enter the code sent{' '}
          {email ? <>to <b className="text-grey-500">{email}</b></> : 'to your email'}
        </h5>
      </hgroup>

      <VerifyEmail routePath='/reset-password' />
    </section>
  );
}
