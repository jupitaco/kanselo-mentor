import Button from "@/components/ui/button";
import PopoverWrapper from "@/components/ui/popover/popoverWrapper";
import { notifsData } from "@/mock";
import { NotifIcon } from "@/public/svgs/svgs";
import Image from "next/image";
import React from "react";
import { GoDotFill } from "react-icons/go";

export const RenderNotifs = () => {
  return (
    <PopoverWrapper
      align="end"
      triggerChildren={
        <button>
          <NotifIcon />
        </button>
      }
    >
      <ul className="custom-scrollbar max-h-72 max-w-sm overflow-y-auto">
        {notifsData.map((item, idx) => (
          <NotificationCard key={idx} {...item} />
        ))}
      </ul>
    </PopoverWrapper>
  );
};

export const NotificationCard = ({
  image,
  title,
  read,
  time,
  action,
}: {
  action: string;
  title: string;
  image: string;
  read: boolean;
  time: string;
}) => {
  return (
    <li className="hover:bg-grey-5 flex cursor-pointer flex-wrap items-start gap-4 px-4 py-2">
      <div className="inline-flex w-fit items-center">
        <GoDotFill className={read ? "text-grey-200" : "text-primary"} />
        <figure className="relative size-8 overflow-hidden rounded-full">
          <Image src={image} alt="" fill sizes="100%" />
        </figure>
      </div>
      <article className="flex-1">
        <div className="space-y-2">
          <h5 className="text-grey-550 text-sm">{title}</h5>
          <small className="text-grey-550">{time}</small>
        </div>

        <div className="mt-3">
          <Button className="pry-btn min-h-[35px]!">{action}</Button>
        </div>
      </article>
    </li>
  );
};
