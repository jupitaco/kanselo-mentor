"use client";
 import Image from "next/image";
import { allImages } from "@/public/images/images";
import Hambugger from "./hambugger";
import "./navbar.css";
import { usePathname, useSearchParams } from "next/navigation";
import { RenderNotifs } from "./notifications/notifications";

const TopBar = () => {
  const searchParams = useSearchParams();
  // const rsp = await getCurrentUserApi();
  // const userData = rsp?.ok ? rsp?.body?.user : null;

  const mentorName = searchParams.get("mentorName");

  const userData = {
    firstName: "Richard ",
    lastName: "Hederson",
    email: "richardhederson@gmail.com",
  };

  const path = usePathname();

  const cleanedPath = path
    .split("/")
    .at(1)
    ?.replace(/-and-/g, " & ")
    ?.replace(/-/g, " ");

  const title = cleanedPath + `${mentorName ? ` - ${mentorName}` : ""}`;

  return (
    <>
      <header className="border-grey-100 sticky top-0 left-0 hidden min-h-(--main-header-height) items-center justify-center border-b bg-white lg:flex">
        <section className="heading flex w-full items-center justify-between gap-4 p-5 lg:justify-end">
          <article className="w-fit">
            <h2 className="font-bold capitalize">{title}</h2>
          </article>
          <article className="hidden flex-1 items-center justify-end gap-2 lg:flex">
            <RenderNotifs />

            <div className="flex items-center justify-end gap-2 rounded-full! px-3 py-2">
              <figure className="relative size-12 overflow-hidden rounded-xl">
                <Image
                  src={allImages.avatar}
                  alt="profile"
                  className="h-full w-full object-cover"
                  fill
                  sizes="100%"
                />
              </figure>
              <div className="flex-1">
                <h5 className="text-sm font-medium">
                  {userData?.firstName} {userData?.lastName}
                </h5>
                <small className="text-grey-400">{userData?.email}</small>
              </div>
            </div>
          </article>
        </section>
      </header>

      <header className="border-Line flex min-h-(--main-header-height) items-center justify-between border-b bg-white px-4 lg:hidden">
        <article className="flex w-fit items-center gap-3">
          <h2 className="font-bold capitalize">{title}</h2>
        </article>

        <div className="flex flex-1 items-center justify-end px-2">
          <Hambugger />
        </div>
      </header>
    </>
  );
};

export default TopBar;
