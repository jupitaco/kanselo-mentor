import { ReactNode, Suspense } from "react";

import TopBar from "../topbar/topbar";
import RenderSidebar from "./renderSidebar";

export default async function MainPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex h-screen">
      <RenderSidebar />
      <div className="w-full lg:w-[81%]">
        <Suspense>
          <TopBar />
        </Suspense>
        <div className="custom-scrollbar bg-grey-5 h-[calc(100vh-var(--main-header-height))] w-full overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
