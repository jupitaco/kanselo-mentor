import Image from "next/image";
import React, { ReactNode } from "react";
import banner from "@/public/svgs/settings-banner.svg";
import { SettingsProvider } from "@/context/settingsContext";
import ProfilePicture from "@/components/main/settings/profilePicture";
import { getCurrentUserApi } from "@/services/apis/auth.api";
import { UserData } from "@/types/auths";

export default async function SettingsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const rsp = await getCurrentUserApi();
  const currentUser = rsp?.ok ? rsp?.body?.data : ({} as UserData);
  return (
    <SettingsProvider userData={currentUser}>
      <main className="p-5">
        <section className="overflow-hidden rounded-lg bg-white">
          <div className="relative h-70 w-full">
            <Image src={banner} alt="" className="size-full object-cover" />
            <div className="absolute bottom-0 left-1/2 grid size-44 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full bg-white p-2">
              <ProfilePicture />
            </div>
          </div>

          <section className="mt-20 px-2 py-5 md:px-10">{children}</section>
        </section>
      </main>
    </SettingsProvider>
  );
}
