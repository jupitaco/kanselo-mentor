import {
  CalendarIcon,
  DashboardIcon,
  LineCalendarIcon,
  LineDashboardIcon,
  LineSettingsIcon,
  LineTemplateIcon,
  LineTicketStarIcon,
  SettingsIcon,
  TemplateIcon,
  TicketStarIcon,
} from "@/public/svgs/svgs";

export const SidebarData = [
  {
    icon: <DashboardIcon />,
    lineIcon: <LineDashboardIcon />,
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    icon: <CalendarIcon />,
    lineIcon: <LineCalendarIcon />,
    title: "Appointments",
    url: "/appointments",
  },
  {
    icon: <TemplateIcon />,
    lineIcon: <LineTemplateIcon />,
    title: "Templates",
    url: "/templates",
  },
  {
    icon: <TicketStarIcon />,
    lineIcon: <LineTicketStarIcon />,
    title: "Payouts",
    url: "/payouts",
  },

  {
    icon: <SettingsIcon />,
    lineIcon: <LineSettingsIcon />,
    title: "Settings",
    url: "/settings",
    childRoutes: [
      {
        icon: null,
        lineIcon: null,
        title: "Basic",
        url: "/settings/basic",
      },
      {
        icon: null,
        lineIcon: null,
        title: "Business",
        url: "/settings/business",
      },
      {
        icon: null,
        lineIcon: null,
        title: "Security",
        url: "/settings/security",
      },
    ],
  },
];
