import SignupForm from "@/components/auth/signupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function page() {
  return (
    <section className="space-y-8">
      <h1>Register Account</h1>
      <h5 className="text-grey-400">Let’s create your account</h5>

      <SignupForm />
    </section>
  );
}
