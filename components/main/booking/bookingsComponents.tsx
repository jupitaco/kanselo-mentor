"use client";
import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu";
import ErrorMessage from "@/components/ui/errorMessage";
import FormInput from "@/components/ui/formInput";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/formInput/radio/radioGroup";
import Search from "@/components/ui/search";
import { StarRatings } from "@/components/ui/starRatings";
import { bookingTimeData, filterData, sessionData } from "@/mock";
import { BookCallSchema, BookCallTypeValues } from "@/schemas/bookcall.schemas";
import { Mentor } from "@/types/global";
import { formatDate, formatNumInThousands } from "@/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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

export const MentorAvatar = ({ image, name, location }: Mentor) => {
  return (
    <div className="border-grey-200 space-y-3 overflow-hidden rounded-xl border bg-white">
      <figure className="relative h-60 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="100%"
          className="object-cover"
        />
      </figure>
      <div className="space-y-2 p-4">
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

export const BookCallForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm<BookCallTypeValues>({
    resolver: zodResolver(BookCallSchema),
    defaultValues: {
      message: "",
      session: "30",
      date: new Date()?.toISOString().split("T").at(0),
      time: "",
    },
  });

  const onSubmit = (data: BookCallTypeValues) => {
    console.log("book-a-call>>", data);
  };

  return (
    <aside className="flex-1 space-y-5 rounded-xl bg-white p-5">
      <h4 className="font-semibold">Call Information</h4>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          id="message"
          label="Message to Mentor"
          type="textarea"
          inputClassName="rounded!"
          placeholder="Enter reason for call"
          error={errors.message?.message}
          {...register("message")}
        />

        <Controller
          name="session"
          control={control}
          render={({ field }) => (
            <FormInput
              id="session"
              type="shadSelect"
              label="Session"
              placeholder="Select Session"
              shadcnSelectData={sessionData}
              error={errors.session?.message}
              value={field.value}
              onSelectItem={field.onChange}
              inputClassName="rounded!"
            />
          )}
        />

        <h4>Available Times</h4>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <FormInput
              id="date"
              type="date"
              label="Date"
              placeholder={formatDate(new Date())}
              error={errors.date?.message}
              DateTimeValue={field.value ? new Date(field.value) : undefined}
              onDateChange={(date) => {
                field.onChange(date?.toISOString().split("T").at(0));
              }}
              inputClassName="rounded!"
            />
          )}
        />

        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
            >
              {bookingTimeData.map(({ id, time, value }) => (
                <label
                  htmlFor={value}
                  key={id}
                  className={`${errors.time ? "errors" : "border-grey-200"} flex cursor-pointer items-center justify-between gap-4 rounded border p-4`}
                >
                  {time}

                  <RadioGroupItem value={value} id={value} />
                </label>
              ))}
            </RadioGroup>
          )}
        />
        {errors.time && <ErrorMessage message={errors.time.message} />}

        <Button className="pry-btn w-full" type="submit">
          Book Now
        </Button>
      </form>
    </aside>
  );
};
