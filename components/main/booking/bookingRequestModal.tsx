"use client";

import Button from "@/components/ui/button";
import ModalWrapper from "@/components/ui/modals/modalWrapper";
import { useModalContext } from "@/context/modalContext";
import { handleError, handleSuccess } from "@/utils/helper";
import { BookedMenteeType, QuickBookingType } from "@/types/bookings";
import { MenteeAvatar } from "./bookingsComponents";
import { useState } from "react";
import {
  acceptBookingReqAction,
  cancelAppointmentAction,
} from "@/libs/actions/bookings.actions";
import { sessionData } from "@/mock";

const BookingRequestModal = () => {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const { isOpen, closeModal, getData } = useModalContext();
  const booking = getData as Partial<QuickBookingType>;

  if (!isOpen["booking-request"]) return null;

  const menteeId = booking?.mentee?._id as string;
  const bookingId = booking?.bookingId as string;

  const handleAccept = async () => {
    setIsLoading({ accept: true });
    try {
      const rsp = await acceptBookingReqAction(bookingId);

      if (rsp?.error) {
        handleError(rsp?.message);
        setIsLoading({ accept: false });
        return;
      } else {
        handleSuccess(rsp?.message);
        closeModal("booking-request");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading({ accept: false });
    }
  };

  const handleDecline = async () => {
    setIsLoading({ decline: true });
    try {
      const rsp = await cancelAppointmentAction(menteeId, bookingId, {
        reason: "Not available",
      });

      if (rsp?.error) {
        handleError(rsp?.message);
        setIsLoading({ decline: false });
        return;
      } else {
        handleSuccess(rsp?.message);
        closeModal("booking-request");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading({ decline: false });
    }
  };

  const duration = sessionData?.find(
    (session) => session?.duration === booking?.sessionDurationMinutes,
  )?.label;
  return (
    <ModalWrapper
      id="booking-request"
      title="Incoming Call"
      subtitle="You just received a quick call request."
      headerClass="text-center items-center!"
      titleClass="text-base font-semibold"
      subtitleClass="text-sm text-grey-300"
    >
      <div className="text-grey-400 space-y-3 text-sm">
        <div>
          <small className="mb-2">Mentee</small>
        </div>
        <MenteeAvatar {...(booking?.mentee as BookedMenteeType)} />
        {/* {booking?.mentee?.fullName && (
          <p>
            <span className="font-semibold text-black">From:</span>{" "}
            {booking.mentee.fullName}
          </p>
        )}

        {booking?.selectedDate && (
          <p>
            <span className="font-semibold text-black">Date:</span>{" "}
            {formatDate(booking.selectedDate)}
          </p>
        )} */}

        {/* {booking?.selectedTime && (
          <p>
            <span className="font-semibold text-black">Time:</span>{" "}
            {booking.selectedTime}
            {booking?.selectedEndTime ? ` - ${booking.selectedEndTime}` : ""}
          </p>
        )}

        {booking?.message && (
          <p className="bg-grey-50 text-grey-400 rounded-md px-3 py-2">
            {booking.message}
          </p>
        )} */}

        <div className="space-y-2">
          <small>Session details</small>
          <h4 className="text-grey-500">{duration}</h4>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Button
          className="outline-btn w-full"
          onClick={handleDecline}
          loading={isLoading["decline"]}
        >
          Decline
        </Button>
        <Button
          className="pry-btn w-full"
          onClick={handleAccept}
          loading={isLoading["accept"]}
        >
          Accept
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default BookingRequestModal;
