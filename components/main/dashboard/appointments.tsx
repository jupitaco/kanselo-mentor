import { getUpcomingAppointmentsApi } from "@/services/apis/bookings.api";
import { SearchPageParams } from "@/types/global";
import { formatDateToLocale } from "@/utils/helper";
import {
  AppointmentErrorUI,
  AppointmentNoDataUI,
  AppointmentsCalendar,
} from "./manageAppointments";

export default async function Appointments({ selectedDate }: SearchPageParams) {
  const rsp = await getUpcomingAppointmentsApi(
    selectedDate || formatDateToLocale(new Date()),
  );

  if (!rsp?.ok) {
    return <AppointmentErrorUI body={rsp?.body} />;
  }

  const { data } = rsp?.body;

  if (data?.length === 0) {
    return <AppointmentNoDataUI />;
  }

  return <AppointmentsCalendar data={data} />;
}
