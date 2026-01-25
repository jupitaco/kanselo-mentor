'use client'
import Button from '@/components/ui/button'
import FormInput from '@/components/ui/formInput'
import { officeHours, WeeklyHours } from '@/mock'
import { DayOfWeek, OfficeDay } from '@/types/booking'
import React, { useState } from 'react'
import { BsX } from 'react-icons/bs'
import { FaCirclePlus } from 'react-icons/fa6'
import { IoSettingsOutline } from 'react-icons/io5'


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


export const AppointmentSettings = () => {
    const [isClicked, setIsClicked] = useState(false)

    const handleToggle = () => {
        setIsClicked(!isClicked)
    }


    return (
        <section className='rounded-2xl bg-white p-5 w-full max-w-2xl space-y-6'>
            <div className='flex justify-between flex-wrap gap-4'>
                <h4>Weekly hours</h4>

                {!isClicked && <Button
                    className="outline-btn min-h-[38px]! bg-grey-100 text-grey-500! py-0! text-xs! w-full lg:w-fit"
                    onClick={handleToggle}>
                    <IoSettingsOutline />
                    Edit Schedule
                </Button>
                }
            </div>
            <>
                {
                    !isClicked ?
                        <ul className='space-y-10'>
                            {
                                WeeklyHours.map(({ day, time }, idx) => (
                                    <li key={idx} className='flex justify-between'>
                                        <p className='flex-1'>{day}</p>
                                        <div className='flex-1'>

                                            {
                                                time?.length > 0 ? <ul className='text-grey-400 flex items-center gap-4'>
                                                    {
                                                        time.map((i) => (
                                                            <li key={i}>{i}</li>
                                                        ))
                                                    }
                                                </ul> : <p className='text-grey-400 '>Unavailable</p>
                                            }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul> :
                        <EditAppointmentSettings action={handleToggle} />
                }

            </>
        </section>
    )
}


export const EditAppointmentSettings = ({ action }: { action: () => void }) => {
    const [officeHoursData, setOfficeHoursData] =
        useState<OfficeDay[]>(officeHours);


    const handleOfficeHoursChange = (dayTitle: string, checked: boolean) => {
        setOfficeHoursData((prev) => prev.map((day) => day.title === dayTitle ?
            { ...day, checked, time: checked ? day.time?.length ? day?.time : [{ startTime: "9:00", endTime: "12:00" }] : [] } : day))
    };

    const handleTimeChange = (dayTitle: string, timeIndex: number, name: "startTime" | "endTime", value: string) => {

        setOfficeHoursData((prev) => prev.map((day) => {
            if (day.title !== dayTitle) return day

            const updatedTime = day.time.map((t, i) => (i === timeIndex ? { ...t, [name]: value } : t))
            return { ...day, time: updatedTime }
        }))
    };

    const addMoreTimeInput = (idx: number) => {
        setOfficeHoursData((prev) => prev.map((day, index) => index === idx ? { ...day, time: [...day.time, { startTime: "09:00", endTime: "12:00" }] } : day))
    };


    const removeTimeRange = (dayTitle: string, timeIndex: number) => {
        setOfficeHoursData(prev =>
            prev.map(day => {
                if (day.title !== dayTitle) return day;

                const updatedTimes = day.time.filter((_, i) => i !== timeIndex);

                return { ...day, checked: timeIndex === 0 ? false : true, time: updatedTimes };
            })
        );
    };


    return (

        <ul className="divide-grey-200 divide-y">
            {officeHoursData.map(({ title, checked, time }, idx) => (
                <li
                    key={idx}
                    className="flex flex-col  justify-between gap-3 gap-y-2 py-3 lg:flex-row  "
                >
                    <div className="flex items-center gap-3 h-fit">
                        <FormInput
                            id=''
                            type="checkbox"
                            value={title}
                            checkValue={checked}
                            onChecked={(e) => handleOfficeHoursChange(title, e)}
                            className="m-0!"
                        />
                        <label
                            htmlFor={title}
                            className="text-grey-400">
                            {title}
                        </label>
                    </div>

                    <div className="flex   gap-3">
                        {time?.length > 0 ? (
                            <div className='flex-1 flex gap-2'>

                                <div className='space-y-2'>

                                    {
                                        time.map(({ startTime, endTime }, i) => (

                                            <div key={i} className='flex items-center gap-3 '>
                                                <input
                                                    id="startTime"
                                                    type='time'
                                                    value={startTime}
                                                    onChange={(e) => handleTimeChange(title, i, 'startTime', e.target.value)}
                                                    className="form-controls py-0! px-2!"
                                                />
                                                <small>-</small>
                                                <input
                                                    id='endTime'
                                                    type='time'
                                                    value={endTime}
                                                    onChange={(e) => handleTimeChange(title, i, 'endTime', e.target.value)}
                                                    className="form-controls py-0! px-2!"
                                                />
                                                <button onClick={() => removeTimeRange(title, i)}
                                                >
                                                    <BsX />
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>


                                <div>

                                    <button onClick={() => addMoreTimeInput(idx)}
                                    >
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
            ))}


            <div className="mt-9 flex items-center justify-end pt-5">

                <div className="flex gap-3">
                    <Button
                        className="outline-btn"
                        type="button"
                        onClick={action}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="pry-btn"
                        // type="submit"
                        onClick={action}
                    // loading={isPending}
                    >
                        Save Changes
                    </Button>
                </div>

            </div>
        </ul>


    )
}
