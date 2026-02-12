 import Image from "next/image";
import React, { ReactNode } from "react";
import banner from "@/public/svgs/settings-banner.svg";
import { SettingsProvider } from "@/context/settingsContext";
import ProfilePicture from "@/components/main/settings/profilePicture";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider  >
      <main className="p-5">
        <section className="overflow-hidden rounded-lg bg-white">
          <div className="relative h-70 w-full">
            <Image src={banner} alt="" className="size-full object-cover" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full size-44 bg-white p-2 grid place-items-center">
              <ProfilePicture />
            </div>
          </div>

          <section className="mt-20 px-2 py-5 md:px-10">{children}</section>
        </section>
      </main>
    </SettingsProvider>
  );
}
