import ResetPasswordForm from "@/components/auth/resetPasswordForm";
import GoBackBtn from "@/components/ui/goBackBtn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function page() {
  return (
    <section className="space-y-8">
      <GoBackBtn />
      <h1>Create New Password</h1>
      <h5 className="text-grey-400">
        Send your email account to reset password and make new password
      </h5>

      <ResetPasswordForm />
    </section>
  );
}
