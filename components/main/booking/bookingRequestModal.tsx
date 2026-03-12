"use client";

import Button from "@/components/ui/button";
import ModalWrapper from "@/components/ui/modals/modalWrapper";
import { useModalContext } from "@/context/modalContext";
import { formatDate } from "@/utils/helper";
import { BookedMenteeType, BookingType } from "@/types/bookings";
import { MenteeAvatar } from "./bookingsComponents";

const BookingRequestModal = () => {
  const { isOpen, closeModal, getData } = useModalContext();
  const booking = getData as Partial<BookingType>;

  if (!isOpen["booking-request"]) return null;

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
        <MenteeAvatar {...(booking?.userId as BookedMenteeType)} />
        {booking?.userId?.fullName && (
          <p>
            <span className="font-semibold text-black">From:</span>{" "}
            {booking.userId.fullName}
          </p>
        )}

        {booking?.selectedDate && (
          <p>
            <span className="font-semibold text-black">Date:</span>{" "}
            {formatDate(booking.selectedDate)}
          </p>
        )}

        {booking?.selectedTime && (
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
        )}
      </div>

      <div className="mt-5">
        <Button
          className="pry-btn w-full"
          onClick={() => closeModal("booking-request")}
        >
          Decline
        </Button>
        <Button
          className="pry-btn w-full"
          onClick={() => closeModal("booking-request")}
        >
          Accept
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default BookingRequestModal;
