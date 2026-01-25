import { BookingActions } from "@/components/main/booking/bookingActions";
import { TemplateAction } from "@/components/main/templates/templateAction";
import { StarRatings } from "@/components/ui/starRatings";
import {
  AvatarCard,
  OrderStatus,
} from "@/components/ui/tableComponent/tabelComps";
import { Column } from "@/components/ui/tableComponent/tableComponent";
import { BookingType, OfficeDay, } from "@/types/booking";
import { Mentor, Review, Template, BookingTime } from "@/types/global";
import { TransactionType } from "@/types/payout";
import { formatNumInThousands } from "@/utils/helper";
import { ReactNode } from "react";
export const filterData = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Branding",
    value: "Branding",
  },
  {
    label: "Copywriting",
    value: "Copywriting",
  },
  {
    label: "Publishing",
    value: "Publishing",
  },
  {
    label: "Search Engine Optimization",
    value: "Search Engine Optimization",
  },
  {
    label: "Social Media Marketing",
    value: "Social Media Marketing",
  },
  {
    label: "Public Relations",
    value: "Public Relations",
  },
  {
    label: "Sales & Lead Generation",
    value: "Sales & Lead Generation",
  },
  {
    label: "Email Marketing",
    value: "Email Marketing",
  },
  {
    label: "Advertising",
    value: "Advertising",
  },
  {
    label: "Growth Strategy",
    value: "Growth Strategy",
  },
  {
    label: "Inbound Marketing",
    value: "Inbound Marketing",
  },
  {
    label: "Search Engine Marketing",
    value: "Search Engine Marketing",
  },
];

export const mentorsData: Mentor[] = [
  {
    id: "1",
    name: "Adrian Solomon",
    location: "Toronto, Canada",
    title: "How to grow a profitable eCommerce Business",
    description:
      "19 years of product marketing experience, starting at Apple in the early days of our online music initiatives. Named as Top 30 under 30 by Marketing Magazine. I can help clarify your idea and advise on growth tactics",
    bio: "19 years of product marketing experience, starting at Apple in the early days of our online music initiatives. Named as Top 30 under 30 by Marketing Magazine. I can help clarify your idea and advise on growth tactics",
    price: 10000.0,
    sessionRate: 10.0,
    image: "/images/mentor1.png",
    rating: 5.0,
    averageRating: 5.0,
    reviews: 821,
    totalConsultation: 821,
    category: "Business Strategy & Marketing",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    location: "New York, USA",
    title: "Narcissistic Personality Disorder Abuse",
    description:
      "Experienced 7 Figures Restaurant Owner, with 15 years experience and a lot of knowledge to share.",
    bio: "Experienced 7 Figures Restaurant Owner, with 15 years experience and a lot of knowledge to share.",
    price: 30000.0,
    sessionRate: 30000.0,
    image: "/images/mentor2.png",
    rating: 5,
    averageRating: 5,
    reviews: 10,
    totalConsultation: 10,
    category: "Mental Health",
  },
  {
    id: "3",
    name: "Michael Chen",
    location: "London, UK",
    title: "Business Strategy & Marketing",
    description:
      "Experienced 7 Figures Restaurant Owner, with 15 years experience and a lot of knowledge to share.",
    bio: "Experienced 7 Figures Restaurant Owner, with 15 years experience and a lot of knowledge to share.",
    price: 20000.0,
    sessionRate: 20000.0,
    image: "/images/mentor3.png",
    rating: 5,
    averageRating: 5,
    reviews: 10,
    totalConsultation: 10,
    category: "Business Strategy & Marketing",
  },
  {
    id: "4",
    name: "Dr. Emily Rodriguez",
    location: "Los Angeles, USA",
    title: "Healthcare - Target and Close Customers",
    description:
      "Experienced 7 Figures Restaurant Owner, with 15 years experience and a lot of knowledge to share.",
    bio: "Experienced 7 Figures Restaurant Owner, with 15 years experience and a lot of knowledge to share.",
    price: 15500.0,
    sessionRate: 15500.0,
    image: "/images/mentor4.png",
    rating: 5,
    averageRating: 5,
    reviews: 10,
    totalConsultation: 10,
    category: "Healthcare",
  },
];

export const notifsData = [
  {
    title: "Your appointment with Uzumaki Naruto begins in 10 minutes.",
    time: "2 minute ago",
    action: "Join Now",
    read: false,
    image: "/images/mentor1.png",
  },
  {
    title: "How was your appointment with Uzumaki Naruto ?",
    time: "2 minute ago",
    action: "Rate",
    read: true,
    image: "/images/mentor2.png",
  },
  {
    title: "How was your appointment with Uzumaki Naruto ?",
    time: "2 minute ago",
    action: "Rate",
    read: true,
    image: "/images/mentor3.png",
  },
  {
    title: "How was your appointment with Uzumaki Naruto ?",
    time: "2 minute ago",
    action: "Rate",
    read: true,
    image: "/images/mentor4.png",
  },
];

export const reviewsData: Review[] = [
  {
    id: "1",
    name: "Anna Mulana",
    image: "/images/reviewer1.png",
    date: "03 Jan 2023",
    text: "Very thank you, very useful and I am very happy",
    rating: 3,
  },
  {
    id: "2",
    name: "Shuri Bashuri",
    image: "/images/reviewer2.png",
    date: "01 Jan 2023",
    text: "Use a very easy-to-understand flow to book tickets",
    rating: 3,
  },
  {
    id: "3",
    name: "Gwen Stacy",
    image: "/images/reviewer3.png",
    date: "08 Jan 2023",
    text: "Thanks for tickering. because it is very helpful to buy tickets anywhere and anytime",
    rating: 4,
  },
  {
    id: "4",
    name: "John Kenedy",
    image: "/images/reviewer4.png",
    date: "12 Jan 2023",
    text: "It is helpful to book tickets with online, so no need to come to the place and queue",
    rating: 5,
  },
  {
    id: "5",
    name: "Jack Markojek",
    image: "/images/reviewer6.png",
    date: "29 Des 2022",
    text: "Very useful but unfortunately there is a slight error in the payment system",
    rating: 2,
  },
];

export const sessionData = [
  {
    label: "1 (30 minutes - $10)",
    value: 30,
  },
  {
    label: "2 (60 minutes - $20)",
    value: 60,
  },
  {
    label: "3 (90 minutes - $30)",
    value: 90,
  },
];

export const templateData: Template[] = [
  {
    id: "1",
    title: "5 secrets to marketing",
    image: "/images/template1.png",
    size: "12 MB",
    price: 20,
    createdAt: "03 Jan 2023",
    totalSales: "25"
  },
  {
    id: "2",
    title: "How to land a marketing job",
    image: "/images/template2.png",
    size: "5MB",
    price: 20,
    createdAt: "03 Jan 2023",
    totalSales: "25"
  },
  {
    id: "3",
    title: "Best marketing tools",
    image: "/images/template3.png",
    size: "3MB",
    price: 20,
    createdAt: "03 Jan 2023",
    totalSales: "25"
  },
];

export const templateColData: Column<Template & { action?: ReactNode }>[] = [
  {
    title: "MENTOR",
    key: "title",
    render: (_, record) => (
      <AvatarCard
        image={record?.image}
        label={`${record?.title}`}
      />
    ),
  },
  {
    title: "DATE ADDED",
    key: "createdAt",
    cellClassName: "text-grey-300",
    render: (_, record) => (
      <>
        {record.createdAt} <br />

      </>
    ),
  },

  {
    title: "PRICE",
    key: "price",
    render: (_, record) => <>${formatNumInThousands(record?.price)} </>,
  },

  {
    title: "AMOUNT SOLD",
    key: "totalSales",
    cellClassName: " text-center",

    render: (_, record) => <>{record?.totalSales}</>,
  },
  {
    title: "ACTION",
    key: "action",
    cellClassName: "min-w-40 max-w-80 text-grey-300",
    render: (_, record) => <TemplateAction data={record} />,
  },
];

export const bookingTimeData: BookingTime[] = [
  {
    id: "1",
    time: "11:00 am",
    value: "11:00",
  },
  {
    id: "2",
    time: "11:30 am",
    value: "11:30",
  },
  {
    id: "3",
    time: "12:00 pm",
    value: "12:00",
  },
  {
    id: "4",
    time: "12:30 pm",
    value: "12:30",
  },
  {
    id: "5",
    time: "01:00 pm",
    value: "13:00",
  },
  {
    id: "6",
    time: "01:30 pm",
    value: "13:30",
  },
  {
    id: "7",
    time: "02:00 pm",
    value: "14:00",
  },
  {
    id: "8",
    time: "02:30 pm",
    value: "14:30",
  },

  {
    id: "11",
    time: "03:00 pm",
    value: "15:00",
  },
  {
    id: "12",
    time: "03:30 pm",
    value: "15:30",
  },
];

export const bookingAssets: BookingType[] = [
  {
    id: "1",
    name: "Anna Mulana",
    avatar: "/images/reviewer1.png",
    location: { city: "Toronto", country: "Canada" },
    date: "03 Jan 2023",
    time: "11:30 AM",
    durationMinutes: 30,
    sessions: "1 (30 mins)",
    review: "Very thank you, very useful and I am very happy",
    status: "active",
    rating: 5,
  },
  {
    id: "2",
    name: "Shuri Bashuri",
    avatar: "/images/reviewer2.png",
    location: { city: "Toronto", country: "Canada" },
    date: "03 Jan 2023",
    time: "11:30 AM",
    durationMinutes: 30,
    sessions: "1 (30 mins)",
    review: "Use a very easy-to-understand flow to book tickets",
    status: "active",
    rating: 0,
  },
  {
    id: "3",
    name: "Gwen Stacy",
    avatar: "/images/reviewer3.png",
    location: { city: "Toronto", country: "Canada" },
    date: "03 Jan 2023",
    time: "11:30 AM",
    durationMinutes: 30,
    sessions: "1 (30 mins)",
    review:
      "Thanks for tickering, because it is very helpful to buy tickets anywhere and anytime",
    status: "active",
    rating: 5,
  },
  {
    id: "4",
    name: "John Kenedy",
    avatar: "/images/reviewer4.png",
    location: { city: "Toronto", country: "Canada" },
    date: "03 Jan 2023",
    time: "11:30 AM",
    durationMinutes: 30,
    sessions: "1 (30 mins)",
    review:
      "It is helpful to book tickets with online, so no need to come to the place and queue",
    status: "active",
    rating: 0,
  },
  {
    id: "5",
    name: "Jack Markojek",
    avatar: "/images/reviewer6.png",
    location: { city: "Toronto", country: "Canada" },
    date: "03 Jan 2023",
    time: "11:30 AM",
    durationMinutes: 30,
    sessions: "1 (30 mins)",
    review:
      "Very useful but unfortunately there is a slight error in the payment system",
    status: "active",
    rating: 5,
  },
  {
    id: "6",
    name: "Frank Zain",
    avatar: "/images/reviewer1.png",
    location: { city: "Toronto", country: "Canada" },
    date: "03 Jan 2023",
    time: "11:30 AM",
    durationMinutes: 30,
    sessions: "1 (30 mins)",
    review: "Very thank you, very useful and I am very happy",
    status: "active",
    rating: 5,
  },
  {
    id: "7",
    name: "Ryan Renold",
    avatar: "/images/reviewer2.png",
    location: { city: "Toronto", country: "Canada" },
    date: "03 Jan 2023",
    time: "11:30 AM",
    durationMinutes: 30,
    sessions: "1 (30 mins)",
    review:
      "Thanks for tickering, because it is very helpful to buy tickets anywhere and anytime",
    status: "active",
    rating: 5,
  },
  {
    id: "8",
    name: "Jesica Janee",
    avatar: "/images/reviewer3.png",
    location: { city: "Toronto", country: "Canada" },
    date: "03 Jan 2023",
    time: "11:30 AM",
    durationMinutes: 30,
    sessions: "1 (30 mins)",
    review:
      "Thank you the application is very useful for me, don't be confused buying tickets",
    status: "active",
    rating: 5,
  },
  {
    id: "9",
    name: "Daniel Alveson",
    avatar: "/images/reviewer6.png",
    location: { city: "Toronto", country: "Canada" },
    date: "03 Jan 2023",
    time: "11:30 AM",
    durationMinutes: 30,
    sessions: "1 (30 mins)",
    review:
      "It is helpful to book tickets with online, so no need to come to the place and queue",
    status: "active",
    rating: 0,
  },
];

export const newBookingColData: Column<BookingType & { action?: ReactNode }>[] = [
  {
    title: "MENTOR",
    key: "name",
    render: (_, record) => (
      <AvatarCard
        image={record?.avatar}
        label={`${record?.name}`}
        subtext={`${record?.location?.city} ${record?.location?.country}`}
      />
    ),
  },
  {
    title: "DATE & TIME",
    key: "date",
    cellClassName: "text-grey-300",
    render: (_, record) => (
      <>
        {record.date} <br />
        {record.time}
      </>
    ),
  },

  {
    title: "SESSION",
    key: "sessions",
    render: (_, record) => <>{record?.sessions} </>,
  },

  {
    title: "MESSAGE",
    key: "review",
    cellClassName: "min-w-40 max-w-40 text-grey-300",
    render: (_, record) => <>{record?.review}</>,
  },
  {
    title: "ACTION",
    key: "action",
    cellClassName: "min-w-40 max-w-80 text-grey-300",
    render: (_, record) => <BookingActions data={record} />,
  },
];

export const completedBookingColData: Column<BookingType & { action?: ReactNode }>[] = [
  {
    title: "MENTOR",
    key: "name",
    render: (_, record) => (
      <AvatarCard
        image={record?.avatar}
        label={`${record?.name}`}
        subtext={`${record?.location?.city} ${record?.location?.country}`}
      />
    ),
  },
  {
    title: "DATE & TIME",
    key: "date",
    cellClassName: "text-grey-300",
    render: (_, record) => (
      <>
        {record.date} <br />
        {record.time}
      </>
    ),
  },

  {
    title: "SESSION",
    key: "sessions",
    render: (_, record) => <>{record?.sessions} </>,
  },

  {
    title: "MESSAGE",
    key: "review",
    cellClassName: "min-w-40 max-w-40 text-grey-300",
    render: (_, record) => <>{record?.review}</>,
  },
  {
    title: "RATINGS",
    key: "rating",
    render: (_, record) => <StarRatings rating={record?.rating} />,
  },
];

export const cancelledBookingColData: Column<BookingType>[] = [
  {
    title: "MENTOR",
    key: "name",
    render: (_, record) => (
      <AvatarCard
        image={record?.avatar}
        label={`${record?.name}`}
        subtext={`${record?.location?.city} ${record?.location?.country}`}
      />
    ),
  },
  {
    title: "DATE & TIME",
    key: "date",
    cellClassName: "text-grey-300",
    render: (_, record) => (
      <>
        {record.date} <br />
        {record.time}
      </>
    ),
  },

  {
    title: "SESSION",
    key: "sessions",
    render: (_, record) => <>{record?.sessions} </>,
  },

  {
    title: "MESSAGE",
    key: "review",
    cellClassName: "min-w-40 max-w-40 text-grey-300",
    render: (_, record) => <>{record?.review}</>,
  },

];


export const recentBookingColData: Column<BookingType>[] = [
  {
    title: "MENTOR",
    key: "name",
    render: (_, record) => (
      <AvatarCard
        image={record?.avatar}
        label={`${record?.name}`}
        subtext={`${record?.location?.city} ${record?.location?.country}`}
      />
    ),
  },
  {
    title: "DATE & TIME",
    key: "date",
    cellClassName: "text-grey-300",
    render: (_, record) => (
      <>
        {record.date} <br />
        {record.time}
      </>
    ),
  },

  {
    title: "SESSION",
    key: "sessions",
    render: (_, record) => <>{record?.sessions} </>,
  },


]

export const callRatings = [
  {
    emoji: "🤢",
    label: "Terrible",
    rating: 1,
  },
  {
    emoji: "☹️",
    label: "Bad",
    rating: 2,
  },
  {
    emoji: "😐",
    label: "Meh",
    rating: 3,
  },
  {
    emoji: "😊",
    label: "Good",
    rating: 4,
  },
  {
    emoji: "😋",
    label: "Awesome",
    rating: 5,
  },
];

export const transactionAssets: TransactionType[] = [
  {
    id: "1",
    date: "03 Jan 2023",
    time: "11:30 AM",
    status: "Successful",
    amount: 20,
    type: "Template sale",
  },
  {
    id: "2",
    date: "03 Jan 2023",
    time: "11:30 AM",
    status: "Pending",
    amount: 20,
    type: "Template sale",
  },
  {
    id: "3",
    date: "03 Jan 2023",
    time: "11:30 AM",
    status: "Failed",
    amount: 20,
    type: "Withdrawal",
  },
  {
    id: "4",
    date: "03 Jan 2023",
    time: "11:30 AM",
    status: "Failed",
    amount: 20,
    type: "Withdrawal",
  },
  {
    id: "5",
    date: "03 Jan 2023",
    time: "11:30 AM",
    status: "Failed",
    amount: 20,
    type: "Withdrawal",
  },
  {
    id: "6",
    date: "03 Jan 2023",
    time: "11:30 AM",
    status: "Pending",
    amount: 20,
    type: "Template sale",
  },
  {
    id: "7",
    date: "03 Jan 2023",
    time: "11:30 AM",
    status: "Pending",
    amount: 20,
    type: "Withdrawal",
  },
  {
    id: "8",
    date: "03 Jan 2023",
    time: "11:30 AM",
    status: "Successful",
    amount: 20,
    type: "Consultation",
  },
  {
    id: "9",
    date: "03 Jan 2023",
    time: "11:30 AM",
    status: "Successful",
    amount: 20,
    type: "Withdrawal",
  },
  {
    id: "10",
    date: "03 Jan 2023",
    time: "11:30 AM",
    status: "Successful",
    amount: 20,
    type: "Consultation",
  },
];

export const transactionolData: Column<TransactionType>[] = [
  {
    title: "AMOUNT",
    key: "amount",
    render: (_, record) => <>{record?.type === "withdrawl" ? "-" : "+"}${formatNumInThousands(record?.amount)}</>,
  },
  {
    title: "DATE",
    key: "date",
    render: (_, record) => (
      <>
        {record.date}
      </>
    ),
  },
  {
    title: "TIME",
    key: "time",
    render: (_, record) => (
      <>
        {record.time}
      </>
    ),
  },
  {
    title: "TYPE",
    key: "type",
    render: (_, record) => <>{record?.type}</>,
  },
  {
    title: "STATUS",
    key: "status",
    render: (_, record) => <OrderStatus status={record?.status} />,
  },

];

export const walletFilterData = [
  { label: "Last 7 Days", value: "last7days" },
  { label: "Last 30 days", value: "last30days" },
];



export const WeeklyHours = [
  {
    day: "Sunday",
    time: []
  },
  {
    day: "Monday",
    time: ["09:00 - 12:00", "13:00 - 17:00"]
  },
  {
    day: "Tuesday",
    time: ["09:00 - 12:00", "13:00 - 17:00"]
  },
  {
    day: "Wednesday",
    time: ["09:00 - 12:00", "13:00 - 17:00"]
  },
  {
    day: "Thursday",
    time: ["09:00 - 12:00", "13:00 - 17:00"]
  },
  {
    day: "Friday",
    time: ["09:00 - 12:00", "13:00 - 17:00"]
  },
  {
    day: "Saturday",
    time: []
  },
]

export const officeHours: OfficeDay[] = [
  {
    title: "Sunday", checked: false, time: []
  },
  {
    title: "Monday", checked: true, time: [{ startTime: "09:00", endTime: "12:00" }, { startTime: "09:00", endTime: "12:00" }]
  },
  {
    title: "Tuesday", checked: true, time: [{ startTime: "09:00", endTime: "12:00" }]
  },
  {
    title: "Wednesday", checked: true, time: [{ startTime: "09:00", endTime: "12:00" }]
  },
  {
    title: "Thursday", checked: true, time: [{ startTime: "09:00", endTime: "12:00" }]
  },
  {
    title: "Friday", checked: true, time: [{ startTime: "09:00", endTime: "12:00" }]
  },
  {
    title: "Saturday", checked: false, time: []
  },
];