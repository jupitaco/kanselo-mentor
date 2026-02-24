"use client";
import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import { DialogClose, DialogFooter } from "@/components/ui/modals/dialog";
import ModalWrapper from "@/components/ui/modals/modalWrapper";
import { StarRatings } from "@/components/ui/starRatings";
import { TooltipWrapper } from "@/components/ui/tooltip/tooltipWrapper";
import { useBookingsContext } from "@/context/bookingsContext";
import { useModalContext } from "@/context/modalContext";
import { cancelAppointmentAction } from "@/libs/actions/bookings.actions";
import { callRatings } from "@/mock";
import { BookingType } from "@/types/bookings";
import { handleError, handleSuccess } from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import React, { SyntheticEvent, useState, useTransition } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

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
  const { join, loading } = useBookingsContext();

  const isMoreThan24Hours = () => {
    if (!data?.createdAt) return false;

    const now = new Date()?.getTime();
    const bookingDate = new Date(data?.selectedDate)?.getTime();
    const diffInHours = (now - bookingDate) / (1000 * 60 * 60);

    return diffInHours > 24;
  };

  const cancelBtnDisabled = isMoreThan24Hours();

  return (
    <ul className="grid grid-cols-1 gap-1 lg:grid-cols-3">
      {cancelBtnDisabled ? (
        <li>
          <TooltipWrapper
            title={
              <span
                className={cancelBtnDisabled ? "inline-block w-full" : "w-full"}
              >
                <Button
                  className="alt-btn min-h-9! w-full! px-2! py-0! text-xs!"
                  disabled={cancelBtnDisabled}
                >
                  Cancel <AiOutlineExclamationCircle />
                </Button>
              </span>
            }
          >
            <div>
              <h4 className="text-sm! font-bold!">Cancel booking</h4>
              <p className="text-grey-300 text-xs">
                Appointments cannot be cancelled after 24 hours
              </p>
            </div>
          </TooltipWrapper>

          {isOpen[data?._id] && <CancelBooking id={data?._id} data={data} />}
        </li>
      ) : (
        <li>
          <Button
            onClick={() => openModal(data?._id)}
            className="alt-btn min-h-9! w-full px-2! py-0! text-xs!"
          >
            Cancel
          </Button>

          {isOpen[data?._id] && <CancelBooking id={data?._id} data={data} />}
        </li>
      )}
      <li>
        <Button
          link
          href={`/reschedule-call/${data?._id}?mentorName=${encodeURIComponent(data?.userId?.fullName)}`}
          className="alt-btn border-grey-200 min-h-9! w-full border px-2! py-0! text-xs!"
        >
          Reschedule
        </Button>
      </li>
      <li>
        <Button
          className="pry-btn min-h-9! w-full px-2! py-0! text-xs!"
          onClick={() => join(data)}
          loading={loading[data?._id]}
        >
          Join Call
        </Button>
      </li>
    </ul>
  );
};

export const CompletedBookingActions = ({ data }: { data: BookingType }) => {
  return <StarRatings rating={data?.ratings} />;
};

export const CancelledBookingActions = ({ data }: { data: BookingType }) => {
  return (
    <>
      <Button
        link
        href={`/mentor/book-a-call/${data?._id}?mentorName=${encodeURIComponent(data?.userId?.fullName)}`}
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

export const CancelBooking = ({
  id,
  data,
}: {
  id: string;
  data: BookingType;
}) => {
  const { closeModal } = useModalContext();
  const [isPending, startTransition] = useTransition();
  const [reason, setReason] = useState("");

  const handleCancelBooking = (e: SyntheticEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const rsp = await cancelAppointmentAction(data?.userId?._id, data?._id, {
        reason,
      });
      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(id);
      }
    });
  };

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
      <form onSubmit={handleCancelBooking}>
        <FormInput
          id="reason"
          label="Reason for cancelling"
          type="textarea"
          placeholder="Enter reason"
          inputClassName="rounded-md!"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        <DialogFooter className="mt-6 flex flex-wrap-reverse gap-4">
          <DialogClose asChild>
            <Button className="outline-btn w-full lg:flex-1">
              No, don’t cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="pry-btn w-full lg:flex-1"
            loading={isPending}
          >
            Yes, cancel
          </Button>
        </DialogFooter>
      </form>
    </ModalWrapper>
  );
};
