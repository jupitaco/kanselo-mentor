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

export type TransactionType = {
  id: string;
  date: string;
  time: string;
  type: string;
  status: string;
  amount: number;
};
