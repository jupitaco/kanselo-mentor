"use client";

import * as React from "react";

import { BsCalendar3 } from "react-icons/bs";
import { Calendar } from "./calendar";
import type { DayPicker } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover/popover";
import { formatDate } from "@/utils/helper";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

type DatePickrProps = Omit<
  CalendarProps,
  "selected" | "onSelect" | "disabled"
> & {
  id?: string;
  label?: string | React.ReactNode;
  placeholder: string;
  onSelect: (date: Date | undefined) => void;
  value?: Date;
  disabled?: boolean;
  openDate?: boolean;
  setOpenDate?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  error?: string;
};

export function DatePicker({
  id,
  label,
  placeholder,
  onSelect,
  value,
  disabled,
  mode,
  openDate,
  setOpenDate,
  className,
  error,
  ...rest
}: DatePickrProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <Popover open={openDate} onOpenChange={setOpenDate}>
        <PopoverTrigger asChild>
          <button
            id={id}
            className={`${className} ${
              error ? "errors" : ""
            } form-controls flex items-center justify-between gap-4`}
          >
            {value ? (
              <>
                {formatDate(value)}
                <BsCalendar3 size={18} />
              </>
            ) : (
              <>
                <span className="text-SilverChalice"> {placeholder}</span>
                <BsCalendar3 size={18} />{" "}
              </>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden bg-white p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={onSelect}
            className="border-grey-100 rounded-md border bg-white shadow-sm"
            disabled={disabled}
            {...rest}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
