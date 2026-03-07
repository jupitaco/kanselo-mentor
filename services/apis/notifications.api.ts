import { NotificationRsp } from "@/types/notifications";
import { getUser } from "../session";
import { Api } from "./api";

export const getAllNotificationsApi = async () => {
  const user = await getUser();
  return Api.get<NotificationRsp>(
    `/notifications/${user?._id}?page=1&limiti=20`,
    true,
  );
};

export const readNotificationsApi = async (notifId: string) => {
  return Api.patch<void, NotificationRsp>(
    `/notifications/${notifId}/read`,
    undefined,
    true,
  );
};
