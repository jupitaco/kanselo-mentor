export type BookingStatus = "active" | "cancelled";

export type BookingType = {
  id: string;
  name: string;
  avatar: string;
  location: {
    city: string;
    country: string;
  };
  date: string; // e.g. "03 Jan 2023"
  time: string; // e.g. "11:30 AM"
  durationMinutes: number;
  sessions: string;
  review: string;
  status: BookingStatus;
  rating: number;
};

