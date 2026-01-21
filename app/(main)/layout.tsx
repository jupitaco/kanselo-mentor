import MainPageLayout from "@/components/sidebar/mainPageLayout";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainPageLayout>{children}</MainPageLayout>;
}
