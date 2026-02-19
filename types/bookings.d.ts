import { ApiResponse } from "./auths";

export type BookingStatus = "active" | "cancelled";

export type BookedMenteeType = {
  _id: string;
  fullName: string;
  profilePhoto: string;
  city: string;
  state: string;
  country: string;
};

export type BookingType = {
  _id: string;
  userId: BookedMenteeType;
  mentorId: string;
  message: string;
  session: number;
  selectedDate: string;
  selectedTime: string;
  selectedEndTime: string;
  status: string;
  ratings: number;
  totalAmountPaid: number;
  createdAt: string;
  updatedAt: string;
};

export type BookingRsp = ApiResponse & {
  data: {
    bookings: BookingType[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type UpcomingEventsRsp = ApiResponse & {
  data: BookingType[];
};

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type TimeRange = {
  startTime: string;
  endTime: string;
};

export type OfficeDay = {
  day: string;
  available: boolean;
  slots: { start: string; end: string }[];
};

export type bookingStatsType = ApiResponse & {
  data: {
    totalConsultations: number;
    totalIncome: number;
    consultationChangePercent: string;
    incomeChangePercent: string;
  };
};
