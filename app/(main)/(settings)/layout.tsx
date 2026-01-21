import { ChangeUserProfile } from "@/components/main/settings/basic";
import Image from "next/image";
import React, { ReactNode } from "react";
import banner from "@/public/svgs/settings-banner.svg";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="p-5">
      <section className="overflow-hidden rounded-lg bg-white">
        <div className="relative h-70 w-full">
          <Image src={banner} alt="" className="size-full object-cover" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-white p-2">
            <ChangeUserProfile />
          </div>
        </div>

        <section className="mt-20 px-2 py-5 md:px-10">{children}</section>
      </section>
    </main>
  );
}
