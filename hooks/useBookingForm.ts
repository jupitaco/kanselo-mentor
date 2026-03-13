import { rescheduleAppointmentAction } from "@/libs/actions/bookings.actions";
import { sessionData } from "@/mock";
import { BookCallSchema, BookCallTypeValues } from "@/schemas/bookcall.schemas";
import { AvailableHoursType, UserData } from "@/types/auths";
import { DayOfWeek } from "@/types/bookings";
import {
  formatDateToLocale,
  getDiffrence,
  handleError,
  handleSuccess,
} from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

export const DAYS: DayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export type QueryResponse = {
  status: number;
  data: UserData;
};

const getMentorById = async (id: string) => {
  const rsp = await fetch(`/api/mentor/${id}`);
  const result = await rsp.json();

  if ("error" in result) {
    throw new Error(result.error);
  }

  return result?.data as QueryResponse;
};

export const useBookingForm = ({
  menteeId,
  mentorId,
  bookingId,
  bookingDate,
}: {
  menteeId: string;
  mentorId: string;
  bookingId: string;
  bookingDate: string;
}) => {
  const { push } = useRouter();
  const {
    formState,
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
  } = useForm<BookCallTypeValues>({
    resolver: zodResolver(BookCallSchema),
    defaultValues: {
      message: "",
      selectedDate: formatDateToLocale(new Date()),
      selectedTime: "",
      selectedEndTime: "",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["mentor", mentorId],
    queryFn: () => getMentorById(mentorId),
    enabled: !!mentorId,
  });

  const availableHours = useMemo(
    () =>
      !isLoading && data
        ? data?.data?.availableHours
        : ({} as AvailableHoursType),
    [isLoading, data],
  );

  const consultationFee = useMemo(
    () => (!isLoading && data ? data?.data?.consultationFee : 0),
    [isLoading, data],
  );

  const start = watch("selectedTime");
  const end = watch("selectedEndTime");

  const selectedTime = useMemo(
    () => JSON.stringify({ start, end }),
    [start, end],
  );

  const handleTimeSelect = (start: string, end: string) => {
    setValue("selectedTime", start);
    setValue("selectedEndTime", end);
  };

  const selectedDate = watch("selectedDate");
  const selectedDayOfTheWeek = new Date(selectedDate).getDay();

  const availableHoursByDate = useMemo(() => {
    const dayName = DAYS[selectedDayOfTheWeek];
    const choosingDay = availableHours?.[dayName];

    return choosingDay?.available ? choosingDay?.slots : [];
  }, [availableHours, DAYS, selectedDayOfTheWeek]);

  const sessionPriceList = useMemo(() => {
    if (!consultationFee) return sessionData;

    return sessionData?.map((session, idx) => {
      return {
        ...session,
        label: `${idx + 1} (${session?.duration} minutes $${consultationFee * (idx + 1)})`,
      };
    });
  }, [consultationFee]);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setValue("selectedDate", formatDateToLocale(date));
    }
  };

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    if (selectedDate === formatDateToLocale(new Date(bookingDate))) {
      setError("selectedDate", {
        message: "You can not rebook the same date",
      });
    } else if (availableHoursByDate?.length === 0) {
      setError("selectedDate", {
        message:
          "Mentor not available on the selected day, please choose a different day",
      });
    } else {
      setError("selectedDate", { message: "" });
    }
  }, [availableHoursByDate, selectedDate, bookingDate, setError]);

  const onSubmit = async (data: BookCallTypeValues) => {
    const rsp = await rescheduleAppointmentAction(menteeId, bookingId, data);

    if (rsp?.error) {
      handleError(rsp?.message);
    } else {
      handleSuccess(rsp?.message);
      push("/appointments");
    }
  };

  return {
    handleDateChange,
    formState,
    register,
    control,
    watch,
    setValue,
    availableHoursByDate,
    handleSubmit: handleSubmit(onSubmit),
    selectedDate,
    DAYS,
    sessionPriceList,
    handleTimeSelect,
    selectedTime,
  };
};
