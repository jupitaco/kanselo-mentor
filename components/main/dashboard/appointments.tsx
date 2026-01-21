"use client";

import { Calendar } from "@/components/ui/formInput/datePicker/calendar";
import Image from "next/image";
import React, { useState } from "react";

export const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock appointments data - replace with your actual data
  const appointments = [
    {
      id: 1,
      title: "How to grow a profitable eCommerce Business",
      mentor: "Adrian Solomon",
      time: "10:30am",
      date: new Date(),
      image: "/images/mentor1.png",
    },
    {
      id: 2,
      title: "How to grow a profitable eCommerce Business",
      mentor: "Adrian Solomon",
      time: "10:30am",
      date: new Date(),
      image: "/images/mentor1.png",
    },
    {
      id: 3,
      title: "How to grow a profitable eCommerce Business",
      mentor: "Adrian Solomon",
      time: "10:30am",
      date: new Date(),
      image: "/images/mentor1.png",
    },
  ];

  // Filter appointments for selected date
  const filteredAppointments = appointments.filter(
    (apt) => apt.date.toDateString() === selectedDate.toDateString(),
  );

  return (
    <aside className="border-grey-100 custom-scrollbar h-auto w-full overflow-y-auto border-l bg-white p-4 pb-40 lg:h-screen lg:w-[30%]">
      <div className="space-y-6">
        <h1 className="text-lg font-bold">Upcoming Appointments</h1>

        {/* Calendar */}
        <article className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            // captionLayout="dropdown"
            className="w-full rounded-lg p-4"
          />
        </article>

        {/* Appointments List */}
        <ul className="divide-Line space-y-4 divide-y">
          {filteredAppointments.map((appointment) => (
            <li key={appointment.id} className="flex items-center gap-4 pb-4">
              <Image
                src={appointment.image}
                alt={appointment.mentor}
                className="rounded object-cover"
                width={48}
                height={48}
              />
              <div className="flex-1">
                <h5 className="font-medium">{appointment.title}</h5>
                <p className="text-grey-300 text-xs">
                  {appointment.mentor} • {appointment.time}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
