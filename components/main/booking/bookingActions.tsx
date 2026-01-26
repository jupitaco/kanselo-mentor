"use client";
import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import { DialogClose, DialogFooter } from "@/components/ui/modals/dialog";
import ModalWrapper from "@/components/ui/modals/modalWrapper";
import { StarRatings } from "@/components/ui/starRatings";
import { useModalContext } from "@/context/modalContext";
import { callRatings } from "@/mock";
import { BookingType } from "@/types/booking";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export const BookingActions = ({ data }: { data: BookingType }) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const activeTab = tab || "all";

  let activeAction;

  switch (activeTab) {
    case "completed":
      activeAction = <CompletedBookingActions data={data} />;
      break;

    default:
      activeAction = <AllBookingActions data={data} />;
      break;
  }

  return <>{activeAction}</>;
};

export const AllBookingActions = ({ data }: { data: BookingType }) => {
  const { isOpen, openModal } = useModalContext();

  return (
    <ul className="grid grid-cols-1 gap-1 lg:grid-cols-3">
      <li>
        <Button
          onClick={() => openModal(data?.id)}
          className="alt-btn w-full px-2! min-h-9! text-xs! py-0!"
        >
          Cancel
        </Button>
        {isOpen[data?.id] && <CancelBooking id={data?.id} data={data} />}
      </li>
      <li>
        <Button
          link
          href={`/reschedule-call/${data?.id}?mentorName=${encodeURIComponent(data?.name)}`}
          className="alt-btn border-grey-200 w-full border px-2! min-h-9! text-xs! py-0!"
        >
          Reschedule
        </Button>
      </li>
      <li>
        <Button className="pry-btn w-full px-2! min-h-9! text-xs! py-0!">Join Call</Button>
      </li>
    </ul>
  );
};

export const CompletedBookingActions = ({ data }: { data: BookingType }) => {

  return (<StarRatings rating={data?.rating} />);
};

export const CancelledBookingActions = ({ data }: { data: BookingType }) => {
  return (
    <>
      <Button
        link
        href={`/mentor/book-a-call/${data?.id}?mentorName=${encodeURIComponent(data?.name)}`}
        className="pry-btn w-fit"
      >
        Book Again
      </Button>
    </>
  );
};

export const RateCall = ({ id }: { id: string; data: BookingType }) => {
  const [clicked, setClicked] = useState("");
  return (
    <ModalWrapper
      id={id}
      title="Rate Call"
      titleClass="text-2xl font-semibold"
      subtitle="How was your experience"
      subtitleClass="text-base text-grey-400"
      headerClass="text-center   items-center"
      wrapperClass="max-w-xl!"
    >
      <ul className="mx-auto flex max-w-sm flex-wrap justify-between">
        {callRatings.map(({ emoji, label }, idx) => (
          <li key={idx} className="flex flex-col items-center gap-2">
            <button
              onClick={() => setClicked(label)}
              className={`${clicked === label ? "bg-primary" : "bg-grey-100"} hover:bg-accent-600 grid size-14 place-items-center rounded-full`}
            >
              {emoji}
            </button>
            <p
              className={`${clicked === label ? "text-primary font-bold" : ""} text-center`}
            >
              {label}
            </p>
          </li>
        ))}
      </ul>

      <DialogFooter className="mt-6 justify-center!">
        <Button className="pry-btn">Submit</Button>
      </DialogFooter>
    </ModalWrapper>
  );
};

export const CancelBooking = ({ id }: { id: string; data: BookingType }) => {
  return (
    <ModalWrapper
      id={id}
      icon={<WarningIcon />}
      title="Cancel booking"
      titleClass="text-lg font-semibold"
      subtitle="Bookings can only be cancelled within 24 hours and refund would be made to your wallet"
      subtitleClass="text-base text-center text-grey-400"
      headerClass="text-center items-center"
      wrapperClass="max-w-xl!"
    >
      <form action="">
        <FormInput
          id="reason"
          label="Reason for cancelling"
          type="textarea"
          placeholder="Enter reason"
          inputClassName="rounded-md!"
        />

        <DialogFooter className="mt-6 flex flex-wrap-reverse gap-4">
          <DialogClose asChild>
            <Button className="outline-btn w-full lg:flex-1">
              No, don’t cancel
            </Button>
          </DialogClose>
          <Button className="pry-btn w-full lg:flex-1">Yes, cancel</Button>
        </DialogFooter>
      </form>
    </ModalWrapper>
  );
};
