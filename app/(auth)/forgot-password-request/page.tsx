import React from "react";
import PasswordChangeReqForm from "@/components/auth/passwordChangeReqForm";
import { Metadata } from "next";
import GoBackBtn from "@/components/ui/goBackBtn";

export const metadata: Metadata = {
  title: "Forgot password request",
};

export default function page() {
  return (
    <section className="space-y-10">
      <hgroup className="space-y-5">
        <GoBackBtn />
        <h1>Forgot Password?</h1>
        <h5 className="text-grey-400 text-lg">
          We will send a new password to your account from email
        </h5>
      </hgroup>

      <PasswordChangeReqForm />
    </section>
  );
}
