import { Api } from "./api";
import {
  ApiResponse,
  AuthResponse,
  AvailableHoursType,
  UserData,
} from "@/types/auths";
import { getUser } from "../session";
import {
  BookingRsp,
  bookingStatsType,
  BookingType,
  UpcomingEventsRsp,
  VideoCallRsp,
} from "@/types/bookings";
import { queryBuilder } from "@/utils/helper";
import { BookCallTypeValues } from "@/schemas/bookcall.schemas";

export const getAllBookingsApi = async ({
  page = "1",
  limit = "10",
  status,
}: {
  page?: string;
  limit?: string;
  status?: string;
}) => {
  const user = await getUser();
  return Api.get<BookingRsp>(
    `/booking/mentor/${user?._id}?${queryBuilder({ page, limit, status: String(status) })}`,
    true,
  );
};

export const getRecentBookingsApi = async () => {
  const user = await getUser();
  return Api.get<BookingRsp>(
    `/booking/mentor-dashboard/${user?._id}/recent-consultations?${queryBuilder({ page: "1", limit: "5" })}`,
    true,
  );
};

export const getUpcomingAppointmentsApi = async (selectedDate: string) => {
  const user = await getUser();
  return Api.get<UpcomingEventsRsp>(
    `/booking/mentor-dashboard/${user?._id}/upcoming-appointments?selectedDate=${selectedDate}`,
    true,
  );
};

export const getBookingStatsApi = async () => {
  const rsp = await getUser();
  return Api.get<bookingStatsType>(
    `/booking/mentor-dashboard/${rsp?._id}/metrics`,
    true,
  );
};

export const getBookingByIdApi = async (bookingId: string) => {
  return Api.get<ApiResponse & { data: BookingType }>(
    `/booking/find-booking-by-id/${bookingId}`,
    true,
  );
};

export const updateBooingSettingsApi = async (body: AvailableHoursType) => {
  const rsp = await getUser();
  return Api.patch<AvailableHoursType, AuthResponse>(
    `/user/${rsp?._id}/available-hours`,
    body,
    true,
  );
};

export const rescheduleAppointmentApi = async (
  menteeId: string,
  bookingId: string,
  body: BookCallTypeValues,
) => {
  return Api.patch<BookCallTypeValues, ApiResponse>(
    `/booking/${bookingId}/reschedule/${menteeId}`,
    body,
    true,
  );
};

export const cancelAppointmentApi = async (
  menteeId: string,
  bookingId: string,
  body: { reason: string },
) => {
  return Api.patch<{ reason: string }, ApiResponse>(
    `/booking/${menteeId}/${bookingId}/cancel`,
    body,
    true,
  );
};

export const getMentorByIdApi = (mentorId: string) => {
  return Api.get<ApiResponse & { data: UserData }>(
    `/booking/get-mentor-by-id/${mentorId}`,
    true,
  );
};

export const startVideoCallApi = async (
  bookingId: string,
  participantId: string,
) => {
  return Api.patch<void, VideoCallRsp>(
    `/booking/${bookingId}/${participantId}/agora/token`,
    undefined,
    true,
  );
};

export const acceptBookingReqApi = async (bookingId: string) => {
  const user = await getUser();

  return Api.patch<void, VideoCallRsp>(
    `/booking/book-now/${user?._id}/accept/${bookingId}`,
    undefined,
    true,
  );
};
