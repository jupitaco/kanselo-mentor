"use server";

import { readNotificationsApi } from "@/services/apis/notifications.api";

export const readNotificationsAction = async (notifId: string) => {
  try {
    const rsp = await readNotificationsApi(notifId);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message || "Notification read successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
