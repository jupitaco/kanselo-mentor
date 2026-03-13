"use client";
import Button from "@/components/ui/button";
import ErrorMessage from "@/components/ui/errorMessage";
import FormInput from "@/components/ui/formInput";
import { useBookings } from "@/hooks/useBookings";
import { MentorAvailableHoursType } from "@/types/auths";
import { DayOfWeek } from "@/types/bookings";
import React from "react";
import { BsX } from "react-icons/bs";
import { FaCirclePlus } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

export const isDayOfWeek = (day: string): day is DayOfWeek => {
  return [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ].includes(day);
};

const DAYS: DayOfWeek[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const AppointmentSettings = () => {
  const { officeHoursData, isClicked, handleToggle } = useBookings();

  return (
    <section className="w-full max-w-2xl space-y-6 rounded-2xl bg-white p-5">
      <header className="flex flex-wrap justify-between gap-4">
        <h4>Weekly hours</h4>

        {!isClicked && (
          <Button
            className="outline-btn bg-grey-100 text-grey-500! min-h-[38px]! w-full py-0! text-xs! lg:w-fit"
            onClick={handleToggle}
          >
            <IoSettingsOutline />
            Edit Schedule
          </Button>
        )}
      </header>
      <section>
        {!isClicked ? (
          <ul className="space-y-10">
            {DAYS.map((day) => (
              <AvailableDateCard
                key={day}
                day={day}
                slots={officeHoursData[day]?.slots ?? []}
              />
            ))}
          </ul>
        ) : (
          <EditAppointmentSettings />
        )}
      </section>
    </section>
  );
};

export const EditAppointmentSettings = () => {
  const {
    officeHoursData,
    handleOfficeHoursChange,
    handleTimeChange,
    removeTimeRange,
    addMoreTimeInput,
    handleSubmit,
    isPending,
    handleToggle,
    error,
  } = useBookings();

  return (
    <ul className="divide-grey-200 divide-y">
      {DAYS.map((day) => {
        const { available, slots } =
          officeHoursData[day] || ({} as MentorAvailableHoursType);
        return (
          <li
            key={day}
            className="flex flex-col justify-between gap-3 gap-y-2 py-3 lg:flex-row"
          >
            <div className="flex h-fit items-center gap-3">
              <FormInput
                id=""
                type="checkbox"
                value={day}
                checkValue={available}
                onChecked={(e) => handleOfficeHoursChange(day, e)}
                className="m-0!"
              />
              <label htmlFor={day} className="text-grey-400 capitalize">
                {day}
              </label>
            </div>

            <div className="flex gap-3">
              {slots?.length > 0 ? (
                <div className="flex flex-1 gap-2">
                  <div className="space-y-2">
                    {slots.map(({ start, end }, i) => (
                      <div key={i}>
                        <div className="flex items-center gap-3">
                          <input
                            id="start"
                            type="time"
                            value={start}
                            onChange={(e) =>
                              handleTimeChange(day, i, "start", e.target.value)
                            }
                            className="form-controls px-2! py-0!"
                          />
                          <small>-</small>
                          <input
                            id="end"
                            type="time"
                            value={end}
                            onChange={(e) =>
                              handleTimeChange(day, i, "end", e.target.value)
                            }
                            className="form-controls px-2! py-0!"
                          />
                          <button onClick={() => removeTimeRange(day, i)}>
                            <BsX />
                          </button>
                        </div>

                        {error[`${day}-${i}`] && (
                          <ErrorMessage message={error[`${day}-${i}`]} />
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <button onClick={() => addMoreTimeInput(day)}>
                      <FaCirclePlus className="text-secondary" />
                    </button>
                  </div>
                </div>
              ) : (
                <small className="font-pretendard text-Grey7 text-base">
                  Unavailable
                </small>
              )}
            </div>
          </li>
        );
      })}

      <div className="mt-9 flex items-center justify-end pt-5">
        <div className="flex gap-3">
          <Button className="outline-btn" type="button" onClick={handleToggle}>
            Cancel
          </Button>
          <Button
            className="pry-btn"
            type="button"
            onClick={handleSubmit}
            loading={isPending}
            disabled={Object.keys(error)?.length > 0}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </ul>
  );
};

export const AvailableDateCard = ({
  day,
  slots,
}: {
  day: string;
  slots: { start: string; end: string }[];
}) => {
  return (
    <li className="flex justify-between gap-4">
      <p className="w-fit font-medium capitalize md:w-50">{day}</p>
      <div className="flex-1">
        {slots?.length > 0 ? (
          <ul className="text-grey-400 flex flex-wrap justify-end gap-3 md:justify-normal">
            {slots.map(({ start, end }, index) => (
              <li key={index} className="w-fit">
                {start} - {end}
                {index === slots?.length - 1 ? "" : ","}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-grey-400 text-end md:text-start">Unavailable</p>
        )}
      </div>
    </li>
  );
};
