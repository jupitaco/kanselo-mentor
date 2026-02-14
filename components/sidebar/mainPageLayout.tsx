import { ReactNode, Suspense } from "react";
import TopBar from "../topbar/topbar";
import RenderSidebar from "./renderSidebar";
import { getCurrentUserApi } from "@/services/apis/auth.api";
import { UserData } from "@/types/auths";

export default async function MainPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const rsp = await getCurrentUserApi();
  const currentUser = rsp?.ok ? rsp?.body?.data : ({} as UserData);

  return (
    <main className="flex h-screen">
      <RenderSidebar />
      <div className="w-full lg:w-[81%]">
        <Suspense>
          <TopBar user={currentUser} />
        </Suspense>
        <div className="custom-scrollbar bg-grey-5 h-[calc(100vh-var(--main-header-height))] w-full overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
