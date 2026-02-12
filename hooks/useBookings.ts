import { useAuthContext } from "@/context/authContext";
import { updateBooingSettingsActions } from "@/libs/actions/bookings.actions";
import { AvailableHoursType, MentorAvailableHoursType } from "@/types/auths";
import { handleError, handleSuccess } from "@/utils/helper";
import { useEffect, useState, useTransition } from "react";

export const useBookings = () => {
  const [isPending, startTransition] = useTransition();
  const { currentUserData, isClicked, handleToggle } = useAuthContext();
  const [officeHoursData, setOfficeHoursData] = useState<AvailableHoursType>(
    {} as AvailableHoursType,
  );

  const handleOfficeHoursChange = (
    dayTitle: keyof AvailableHoursType,
    checked: boolean,
  ) => {
    setOfficeHoursData((prev) => {
      const currentDay = prev[dayTitle] as MentorAvailableHoursType;
      return {
        ...prev,
        [dayTitle]: {
          available: checked,
          slots: checked
            ? currentDay.slots?.length
              ? currentDay?.slots
              : [{ start: "09:00", end: "12:00" }]
            : [],
        },
      };
    });
  };

  const handleTimeChange = (
    dayTitle: keyof AvailableHoursType,
    timeIndex: number,
    name: "start" | "end",
    value: string,
  ) => {
    setOfficeHoursData((prev) => {
      const currentDay = prev[dayTitle] as MentorAvailableHoursType;
      const currentSlot = currentDay.slots || [];

      const updatedTime = currentSlot.map((t, i) =>
        i === timeIndex ? { ...t, [name]: value } : t,
      );
      return { ...prev, [dayTitle]: { ...currentDay, slots: updatedTime } };
    });
  };

  const addMoreTimeInput = (dayTitle: keyof AvailableHoursType) => {
    setOfficeHoursData((prev) => {
      const currentDay = prev[dayTitle] as MentorAvailableHoursType | undefined;
      const currentSlots = currentDay?.slots ?? [];
      return {
        ...prev,
        [dayTitle]: {
          ...currentDay,
          slots: [...currentSlots, { start: "09:00", end: "12:00" }],
        },
      };
    });
  };

  const removeTimeRange = (
    dayTitle: keyof AvailableHoursType,
    timeIndex: number,
  ) => {
    setOfficeHoursData((prev) => {
      const currentDay = prev[dayTitle] as MentorAvailableHoursType;

      const updatedTimes = currentDay.slots.filter((_, i) => i !== timeIndex);

      return {
        ...prev,
        [dayTitle]: {
          available: timeIndex === 0 ? false : true,
          slots: updatedTimes,
        },
      };
    });
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const rsp = await updateBooingSettingsActions(officeHoursData);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        handleToggle();
      }
    });
  };

  useEffect(() => {
    if (!currentUserData) return;
    const weeklyHours = currentUserData?.availableHours;
    if (weeklyHours) {
      setOfficeHoursData(weeklyHours);
    }
  }, [currentUserData]);

  return {
    handleOfficeHoursChange,
    handleTimeChange,
    addMoreTimeInput,
    removeTimeRange,
    handleSubmit,
    officeHoursData,
    isPending,
    handleToggle,
    isClicked,
  };
};
