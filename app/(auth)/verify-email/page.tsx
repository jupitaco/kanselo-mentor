import React from "react";
import { Metadata } from "next";
import VerifyEmail from "@/components/auth/verifyEmail";
import GoBackBtn from "@/components/ui/goBackBtn";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) {
  const { email } = await searchParams;
  return (
    <section className="space-y-8">
      <GoBackBtn />

      <h1>Verify Email</h1>
      <h5 className="text-grey-400">
        {" "}
        We sent a code {email ? <b>to your {email}</b> : "to your email"}{" "}
      </h5>

      <VerifyEmail routePath="/dashboard" />
    </section>
  );
}
