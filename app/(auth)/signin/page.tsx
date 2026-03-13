import SigninForm from "@/components/auth/signinForm";
import { PageParams } from "@/types/global";
import { Metadata } from "next";
import { Suspense, use } from "react";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page(props: PageParams) {
  const { redirect } = use(props.searchParams);
  return (
    <section className="space-y-10">
      <hgroup className="space-y-6">
        <h1>Welcome to Kanselo</h1>
        <h5 className="text-grey-400 text-lg">Login to your account</h5>
      </hgroup>

      <Suspense>
        <SigninForm redirectPath={redirect} />
      </Suspense>
    </section>
  );
}
