"use client";
import { SidebarData } from "./sidebarData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "../ui/brandLogo";
import { useModalContext } from "@/context/modalContext";
import Logout from "../logout/logout";
import { HelpCenter } from "./helpCenter";
import { FaChevronDown } from "react-icons/fa6";
import { Fragment, ReactNode, useState } from "react";

const Sidebar = () => {
  return (
    <section className="w-full px-3">
      <article className="flex min-h-(--main-header-height) flex-col justify-center">
        <BrandLogo />
      </article>

      <article className="custom-scrollbar h-[calc(100vh-var(--main-header-height))] overflow-y-auto pb-10">
        <ul className="flex flex-col gap-3">
          <SidebarLink linkList={SidebarData} />

          <Logout />
        </ul>

        <HelpCenter />
      </article>
    </section>
  );
};

export default Sidebar;

type sidebarTypes = {
  icon: ReactNode;
  title: string;
  url: string;
  childRoutes?: {
    icon: ReactNode;
    title: string;
    url: string;
  }[];
};

export const SidebarLink = ({ linkList }: { linkList: sidebarTypes[] }) => {
  const currentPath = usePathname();
  const { setToggle } = useModalContext();

  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      {linkList.map(({ url, icon, title, childRoutes }, idx) => (
        <Fragment key={idx}>
          {childRoutes ? (
            <div className="w-full">
              <button
                key={idx}
                className={`${
                  currentPath.includes(url)
                    ? "sidebarActive"
                    : "sidebarNotActive"
                } flex w-full items-center justify-between`}
                onClick={() => setIsClicked(!isClicked)}
              >
                <span className="flex items-center gap-2 text-sm">
                  {icon}
                  {title}
                </span>

                <FaChevronDown
                  className={
                    isClicked
                      ? "rotate-180 transition-transform ease-in-out"
                      : "rotate-0 transition-transform ease-in-out"
                  }
                />
              </button>

              {isClicked && (
                <ul className="flex flex-col gap-3">
                  {childRoutes.map(({ url, icon, title }, idx) => (
                    <Link
                      key={idx}
                      href={url}
                      className={`${
                        currentPath.includes(url)
                          ? "sidebarActive bg-[#F9F9FB]!"
                          : "sidebarNotActive"
                      } px-10!`}
                      onClick={() => setToggle(false)}
                    >
                      <span className="flex items-center gap-2 text-sm">
                        {icon}
                        {title}
                      </span>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Link
              key={idx}
              href={url}
              className={
                currentPath.includes(url) ? "sidebarActive" : "sidebarNotActive"
              }
              onClick={() => setToggle(false)}
            >
              <span className="flex items-center gap-2 text-sm">
                {icon}
                {title}
              </span>
            </Link>
          )}
        </Fragment>
      ))}
    </>
  );
};
