export type ActionFormStatus = {
  error: boolean;
  message: string;
};

export type PageParams = {
  searchParams: Promise<{ tab: string; redirect: string }>;
};

export type SearchPageParams = {
  tab: string;
  page: string;
  search: string;
  status: string;
  mentorName: string;
  industry: string;
  selectedDate: string;
};

export type SearchParams = {
  searchParams: Promise<SearchPageParams>;
};

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
  totalSales: string;
};

export type BookingTime = {
  id: string;
  time: string;
  value: string;
};

export type IPInforType = {
  ip: string;
  success: boolean;
  type: "IPv4" | "IPv6";
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  region: string;
  region_code: string;
  city: string;
  latitude: number;
  longitude: number;
  is_eu: boolean;
  postal: string;
  calling_code: string;
  capital: string;
  borders: string;
  flag: {
    img: string;
    emoji: string;
    emoji_unicode: string;
  };
  connection: {
    asn: number;
    org: string;
    isp: string;
    domain: string;
  };
  timezone: {
    id: string;
    abbr: string;
    is_dst: boolean;
    offset: number;
    utc: string;
    current_time: string;
  };
};
