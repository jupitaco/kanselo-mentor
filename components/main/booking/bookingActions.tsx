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
import { formatDate, handleError, handleSuccess } from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import React, { SyntheticEvent, useMemo, useState, useTransition } from "react";
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

  const isPast48Hours = () => {
    if (!data?.createdAt) return false;

    const now = new Date()?.getTime();
    const bookingDate =
      new Date(data?.createdAt)?.getTime() + 48 * 60 * 60 * 1000;

    return now > bookingDate;
  };

  const cancelBtnDisabled = isPast48Hours();

  const sessionState = useMemo(() => {
    if (!data?.selectedDate || !data?.selectedTime) return null;

    const now = new Date();
    const datePart = data.selectedDate.split("T")[0]; // "2026-02-24"

    const sessionStart = new Date(`${datePart}T${data.selectedTime}`);
    const sessionEnd = new Date(`${datePart}T${data.selectedEndTime}`);

    if (now < sessionStart) {
      return {
        isStarted: false,
        isEnded: false,
        tooltip: `Session starts on  ${formatDate(data.selectedDate)} at ${data.selectedTime}`,
      };
    }

    if (now >= sessionStart && now <= sessionEnd) {
      return {
        isStarted: true,
        isEnded: false,
        tooltip: `Session is currently active. Ends at ${data.selectedEndTime}`,
      };
    }

    return {
      isStarted: false,
      isEnded: true,
      tooltip: "Session has ended",
    };
  }, [data?.selectedDate, data?.selectedTime, data?.selectedEndTime]);

  return (
    <ul className="grid grid-cols-1 gap-1 lg:grid-cols-3">
      {cancelBtnDisabled || sessionState?.isEnded || sessionState?.isStarted ? (
        <li>
          <TooltipWrapper
            title={
              <span
                className={
                  cancelBtnDisabled ||
                  sessionState?.isEnded ||
                  sessionState?.isStarted
                    ? "inline-block w-full"
                    : "w-full"
                }
              >
                <Button
                  className="alt-btn min-h-9! w-full! px-2! py-0! text-xs!"
                  disabled={
                    cancelBtnDisabled ||
                    sessionState?.isEnded ||
                    sessionState?.isStarted
                  }
                >
                  Cancel <AiOutlineExclamationCircle />
                </Button>
              </span>
            }
          >
            <div>
              <h4 className="text-sm! font-bold!">Cancel booking</h4>
              {sessionState?.isEnded ? (
                <p className="text-grey-300 text-xs">{sessionState?.tooltip}</p>
              ) : sessionState?.isStarted ? (
                <p className="text-grey-300 text-xs">{sessionState?.tooltip}</p>
              ) : (
                <p className="text-grey-300 text-xs">
                  Appointments cannot be cancelled after 48 hours
                </p>
              )}
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
      {cancelBtnDisabled || sessionState?.isEnded || sessionState?.isStarted ? (
        <li>
          <TooltipWrapper
            title={
              <span
                className={
                  cancelBtnDisabled ||
                  sessionState?.isEnded ||
                  sessionState?.isStarted
                    ? "inline-block w-full"
                    : "w-full"
                }
              >
                <Button
                  disabled={
                    cancelBtnDisabled ||
                    sessionState?.isEnded ||
                    sessionState?.isStarted
                  }
                  className="alt-btn border-grey-200 min-h-9! w-full border px-2! py-0! text-xs!"
                >
                  Reschedule
                </Button>
              </span>
            }
          >
            <div>
              <h4 className="text-sm! font-bold!">Reschedule booking</h4>
              {sessionState?.isEnded ? (
                <p className="text-grey-300 text-xs">{sessionState?.tooltip}</p>
              ) : sessionState?.isStarted ? (
                <p className="text-grey-300 text-xs">{sessionState?.tooltip}</p>
              ) : (
                <p className="text-grey-300 text-xs">
                  Appointments cannot be reschedule after 48 hours
                </p>
              )}
            </div>
          </TooltipWrapper>

          {isOpen[data?._id] && <CancelBooking id={data?._id} data={data} />}
        </li>
      ) : (
        <li>
          <Button
            link
            href={`/reschedule-call/${data?._id}?mentorName=${encodeURIComponent(data?.userId?.fullName)}`}
            className="alt-btn border-grey-200 min-h-9! w-full border px-2! py-0! text-xs!"
          >
            Reschedule
          </Button>
        </li>
      )}

      <li>
        <TooltipWrapper
          // Only show the tooltip message if the session hasn't started or has ended
          title={
            <span className="inline-block w-full">
              <Button
                className="pry-btn min-h-9! w-full px-2! py-0! text-xs!"
                onClick={() => join(data)}
                loading={loading[data?._id]}
                // Disable if it hasn't started OR if it has already ended
                disabled={!sessionState?.isStarted || sessionState?.isEnded}
              >
                Join Call
              </Button>
            </span>
          }
        >
          {!sessionState?.isStarted ||
          sessionState?.isEnded ||
          sessionState?.isStarted ? (
            <div>
              <h4 className="text-sm! font-bold!">Join Call</h4>
              <p className="text-grey-300 text-xs">{sessionState?.tooltip}</p>
            </div>
          ) : null}
        </TooltipWrapper>
      </li>
    </ul>
  );
};

export const CompletedBookingActions = ({ data }: { data: BookingType }) => {
  return <StarRatings rating={data?.rating?.stars} />;
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
