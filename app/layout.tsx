import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "animate.css";
import "./globals.css";
import { Providers } from "@/context/providers";
import { Toaster } from "@/components/ui/toast/toaster";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/scrollToTheTop";
import { UserData } from "@/types/auths";
import { getCurrentUserApi } from "@/services/apis/auth.api";

const geistSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Kanselo", template: "%s | Kanselo" },
  description:
    "Build with confidence. Grow with clarity. Kanselo (pronounced Kan-seh-lo) is a digital mentorship and business advisory platform connecting entrepreneurs and professionals with verified mentors and experienced business owners — so you’re never building alone.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const rsp = await getCurrentUserApi();

  const currentUser = rsp?.ok
    ? rsp?.body?.data
    : ({} as UserData);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Providers user={currentUser}>
          <ScrollToTop />
          {children}
          <NextTopLoader showSpinner={false} />

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
