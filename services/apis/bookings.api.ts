import { Api } from "./api";
import { ApiResponse, AuthResponse, AvailableHoursType } from "@/types/auths";
import { getUser } from "../session";
import { BookingRsp, bookingStatsType } from "@/types/bookings";
import { queryBuilder } from "@/utils/helper";

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
    `/booking/mentor-dashboard/${user?._id}/recent-consultations?${queryBuilder({ page: "1", limit: "10" })}`,
    true,
  );
};

export const getUpcomingAppointmentsApi = async (selectedDate: string) => {
  const user = await getUser();
  return Api.get<BookingRsp>(
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

export const updateBooingSettingsApi = async (body: AvailableHoursType) => {
  const rsp = await getUser();
  return Api.patch<AvailableHoursType, AuthResponse>(
    `/user/${rsp?._id}/available-hours`,
    body,
    true,
  );
};

export const cancelBookedSessionApi = async (
  bookingId: string,
  body: { reason: string },
) => {
  const user = await getUser();
  return Api.patch<{ reason: string }, ApiResponse>(
    `/booking/${user?._id}/${bookingId}/cancel`,
    body,
    true,
  );
};
