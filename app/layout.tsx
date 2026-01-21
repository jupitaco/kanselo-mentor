import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "animate.css";
import "./globals.css";
import { Providers } from "@/context/providers";
import { Toaster } from "@/components/ui/toast/toaster";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/scrollToTheTop";

const geistSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Kanselo", template: "%s | Kanselo" },
  description:
    "Build with confidence. Grow with clarity. Kanselo (pronounced Kan-seh-lo) is a digital mentorship and business advisory platform connecting entrepreneurs and professionals with verified mentors and experienced business owners — so you’re never building alone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Providers>
          <ScrollToTop />
          {children}
          <NextTopLoader showSpinner={false} />

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
