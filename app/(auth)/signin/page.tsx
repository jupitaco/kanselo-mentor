import SigninForm from "@/components/auth/signinForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login",
};

export default async function page() {
  return (
    <section className="space-y-10">
      <hgroup className="space-y-6">
        <h1>Welcome to Kanselo</h1>
        <h5 className="text-grey-400 text-lg">Login to your account</h5>
      </hgroup>

      <Suspense>
        <SigninForm />
      </Suspense>
    </section>
  );
}
