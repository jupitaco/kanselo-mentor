export type Mentor = {
  id: string;
  name: string;
  location: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  availableDates?: Date[];
  bio: string;
  averageRating: number;
  totalConsultation: number;
  sessionRate: number;
};

export type Review = {
  id: string;
  name: string;
  image: string;
  date: string;
  text: string;
  rating: number;
};

export type Template = {
  id: string;
  title: string;
  image: string;
  size: string;
  price: number;
  createdAt: string;
  totalSales: string
};

export type BookingTime = {
  id: string;
  time: string;
  value: string;
};
