"use client";
import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import FormInput from "@/components/ui/formInput";
import Search from "@/components/ui/search";
import { StarRatings } from "@/components/ui/starRatings";
import { useBookingForm } from "@/hooks/useBookingForm";
import { filterData } from "@/mock";
import { BookingType } from "@/types/bookings";
import { Mentor } from "@/types/global";
import { formatNumInThousands } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export const MentorCard = ({
  id,
  name,
  location,
  title,
  description,
  price,
  image,
  rating,
}: Mentor) => {
  return (
    <li className="hover:bg-grey-5 flex flex-wrap gap-3 pb-5 hover:shadow-sm">
      <Link
        href={`/mentor/view/${id}?mentorName=${encodeURIComponent(name)}`}
        className="flex flex-1 gap-3"
      >
        <Image
          src={image}
          alt={name}
          width={105}
          height={105}
          className="rounded-xl object-cover"
        />
        <div className="space-y-2">
          <h5 className="font-semibold">{title}</h5>
          <small className="text-grey-300 text-xs font-bold">
            {name} - {location}
          </small>
          <p className="text-xs font-medium">{description}</p>
        </div>
      </Link>
      <div className="w-full space-y-2 lg:w-fit">
        <h4 className="font-bold">₦{formatNumInThousands(price)}</h4>
        <Button
          link
          href={`/mentor/book-a-call/${id}?mentorName=${encodeURIComponent(name)}`}
          className="pry-btn"
        >
          Book a Call
        </Button>
        <StarRatings rating={rating} />
      </div>
    </li>
  );
};

export const SearchMentor = () => {
  const [select, setSelect] = useState<string>("");

  return (
    <article className="space-y-3 rounded-xl bg-white p-3">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <FormInput
          id="category"
          name="category"
          placeholder="Categories"
          type="shadSelect"
          shadcnSelectData={filterData}
          value={select}
          onSelectItem={(e) => setSelect(e)}
        />

        <Search placeholder="Search for mentors" />
      </div>
      <Button className="pry-btn w-full">Search</Button>
    </article>
  );
};

export const MenteeAvatar = ({ image, name, location }: Mentor) => {
  return (
    <div className="flex items-center gap-4 space-y-3 overflow-hidden bg-white">
      <figure className="relative size-26! w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="100%"
          className="object-cover"
        />
      </figure>
      <div className="flex-1 space-y-2 p-4">
        <h5 className="font-semibold">{name}</h5>
        <small className="text-grey-300 font-medium">{location}</small>
      </div>
    </div>
  );
};

export const BookCallBtn = ({ id, name }: Mentor) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="btn pry-btn min-h-16! w-full justify-between! rounded-lg!">
        Book a call <FaChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) bg-white">
        <DropdownMenuItem className="text-primary text-xl font-medium">
          <Link
            href={`/mentor/book-a-call/${id}?mentorName=${encodeURIComponent(name)}`}
          >
            Book for later
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-primary text-xl font-medium">
          <button>Quick call now</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const BookCallForm = ({
  _id,
  mentorId,
  userId,
  selectedDate: bookingDate,
}: BookingType) => {
  const {
    formState: { errors, isSubmitting },
    register,
    // control,
    // selectedTime,
    // availableHoursByDate,
    handleSubmit,
    selectedDate,
    handleDateChange,
    // sessionPriceList,
    // handleTimeSelect,
  } = useBookingForm({
    menteeId: userId?._id,
    mentorId: mentorId?._id,
    bookingId: _id,
    bookingDate,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormInput
        id="message"
        label="Message to Mentor"
        type="textarea"
        inputClassName="rounded!"
        placeholder="Enter reason for call"
        error={errors.message?.message}
        {...register("message")}
      />

      <h4>Available Times</h4>

      <FormInput
        id="selectedDate"
        type="date"
        label="Date"
        placeholder={selectedDate}
        error={errors.selectedDate?.message}
        DateTimeValue={new Date(selectedDate)}
        onDateChange={handleDateChange}
        inputClassName="rounded!"
        disabledPrevDates
      />
      {/*
        <RadioGroup
          value={selectedTime}
          onValueChange={(value) => {
            const { start, end } = JSON.parse(value);
            handleTimeSelect(start, end);
          }}
          className="grid grid-cols-1 gap-3 md:grid-cols-2"
        >
          {availableHoursByDate?.length === 0 ? (
            <div className="card col-span-3 space-y-2 p-4 text-center">
              <h5 className="font-semibold">Mentor is Unavailable</h5>
              <p className="text-grey-300 text-sm">
                <b>{fullName}</b> is unavailable on the selected date, <br />
                please choose a different date
              </p>
            </div>
          ) : (
            availableHoursByDate?.map(({ start, end }, idx) => (
              <label
                htmlFor={start}
                key={idx}
                className={`${errors.selectedTime ? "errors" : "border-grey-200"} flex cursor-pointer items-center justify-between gap-4 rounded border p-4`}
              >
                {start} - {end}
                <RadioGroupItem
                  id={start}
                  value={JSON.stringify({ start, end })}
                />
              </label>
            ))
          )}
        </RadioGroup>

        {errors.selectedTime && (
          <ErrorMessage message={errors.selectedTime.message} />
        )} */}

      <Button
        className="pry-btn w-full"
        type="submit"
        disabled={errors?.selectedDate?.message !== ""}
        loading={isSubmitting}
      >
        Book Now
      </Button>
    </form>
  );
};
