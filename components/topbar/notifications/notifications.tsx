import Button from "@/components/ui/button";
import { EmptyState } from "@/components/ui/emptyState";
import PopoverWrapper from "@/components/ui/popover/popoverWrapper";
import Spinner from "@/components/ui/spinner";
import { readNotificationsAction } from "@/libs/actions/notifications.actions";
import { NotifIcon } from "@/public/svgs/svgs";
import { NotificationsType } from "@/types/notifications";
import { formatDateAgo } from "@/utils/helper";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { GoDotFill } from "react-icons/go";

export const RenderNotifs = ({
  unreadCount,
  notifsData,
  isLoading,
}: {
  unreadCount: number;
  notifsData: NotificationsType[];
  isLoading: boolean;
}) => {
  return (
    <PopoverWrapper
      align="end"
      triggerChildren={
        <button className="relative">
          {unreadCount > 0 && (
            <div className="bg-error absolute -top-2 right-0 flex size-[20] items-center justify-center overflow-hidden rounded-full">
              <p className="text-[9px]! text-white">
                {unreadCount > 10 ? "10+" : unreadCount}
              </p>
            </div>
          )}
          <NotifIcon />
        </button>
      }
    >
      {isLoading ? (
        <div className="grid h-72 max-w-sm place-items-center">
          <Spinner />
        </div>
      ) : notifsData?.length === 0 ? (
        <div className="grid h-72 max-w-sm place-items-center">
          <EmptyState
            title="No Notifications"
            subTitle="Notifications will appear here."
          />
        </div>
      ) : (
        <ul className="custom-scrollbar max-h-72 max-w-sm overflow-y-auto">
          {notifsData?.map((item, idx) => (
            <NotificationCard key={idx} {...item} />
          ))}
        </ul>
      )}
    </PopoverWrapper>
  );
};

export const NotificationCard = ({
  body,
  createdAt,
  isRead,
  _id,
}: NotificationsType) => {
  const queryClient = useQueryClient();

  const readNotid = async () => {
    try {
      const rsp = await readNotificationsAction(_id);
      console.log(rsp);
      if (rsp?.error) {
        return;
      } else {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      }
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <li
      onClick={readNotid}
      className="hover:bg-grey-5 flex cursor-pointer flex-wrap items-start gap-4 px-4 py-2"
    >
      <div className="inline-flex w-fit items-center">
        <GoDotFill className={isRead ? "text-grey-200" : "text-primary"} />
        {/* <figure className="relative size-8 overflow-hidden rounded-full">
          <Image src={image} alt="" fill sizes="100%" />
        </figure> */}
      </div>
      <article className="flex-1">
        <div className="space-y-2">
          <h5 className="text-grey-550 text-sm">{body}</h5>
          <small className="text-grey-550">{formatDateAgo(createdAt)}</small>
        </div>

        <div className="mt-3">
          <Button
            link
            href="/appointments"
            className="pry-btn min-h-[35px]! w-fit!"
            onClick={readNotid}
          >
            View
          </Button>
        </div>
      </article>
    </li>
  );
};
