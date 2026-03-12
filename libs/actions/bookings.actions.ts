"use server";

import { BookCallTypeValues } from "@/schemas/bookcall.schemas";
import {
  acceptBookingReqApi,
  cancelAppointmentApi,
  rescheduleAppointmentApi,
  startVideoCallApi,
  updateBooingSettingsApi,
} from "@/services/apis/bookings.api";
import { AvailableHoursType } from "@/types/auths";
import { revalidatePath } from "next/cache";

export const updateBooingSettingsActions = async (body: AvailableHoursType) => {
  try {
    const rsp = await updateBooingSettingsApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/appointments/schedule-settings");

    return {
      error: false,
      message: rsp?.body?.message || "Booking settings updated successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const rescheduleAppointmentAction = async (
  menteeId: string,
  bookingId: string,
  body: BookCallTypeValues,
) => {
  try {
    const rsp = await rescheduleAppointmentApi(menteeId, bookingId, body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/booking-and-scheduling");

    return {
      error: false,
      message: rsp?.body?.message || "Session cancelled successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const cancelAppointmentAction = async (
  menteeId: string,
  bookingId: string,
  body: { reason: string },
) => {
  try {
    const rsp = await cancelAppointmentApi(menteeId, bookingId, body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/booking-and-scheduling");

    return {
      error: false,
      message: rsp?.body?.message || "Session cancelled successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const acceptBookingReqAction = async (bookingId: string) => {
  try {
    const rsp = await acceptBookingReqApi(bookingId);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/booking-and-scheduling");

    return {
      error: false,
      message: rsp?.body?.message || "Booking accepted successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const startVideoCallAction = async (
  bookingId: string,
  participantId: string,
) => {
  try {
    const rsp = await startVideoCallApi(bookingId, participantId);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message || "Session cancelled successfully",
      data: rsp?.body?.data,
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
