"use client";

import { NotFound } from "@/public/svgs/svgs";
import React, { ReactNode, SVGProps } from "react";
import { PiWarningOctagon } from "react-icons/pi";
import Button from "./button";

export const EmptyState = ({
  title,
  subTitle,
  className,
}: {
  title: string;
  className?: string;
  subTitle: string;
  icon?: ReactNode;
}) => {
  return (
    <section
      className={` ${className} flex flex-col items-center justify-center gap-5`}
    >
      <div className="flex w-8/12 flex-col items-center justify-center">
        <NotFound />
      </div>

      <div className="text-grey-600 w-full text-center">
        <h4>{title}</h4>
        <p>{subTitle}</p>
      </div>
    </section>
  );
};

export const ErrorMessage = ({ message }: { message: any }) => {
  return (
    <div className="error_message font-semi-bold animate__animated animate__bounceIn flex items-center gap-2">
      <div>
        <PiWarningOctagon />
      </div>
      <p className="error_message"> {message}</p>
    </div>
  );
};

export const ErrorUI = ({
  code,
  message,
  className,
}: {
  code: number;
  message?: string;
  className?: string;
}) => {
  return (
    <div
      className={` ${className} flex h-full w-full items-center justify-center bg-white py-9`}
    >
      <div className="mx-auto flex w-full max-w-[352px] flex-col items-center">
        {code === 500 ? (
          <div className="mb-4">
            <ReloadIcon />
          </div>
        ) : (
          <div className="flex w-8/12 flex-col items-center justify-center">
            <NotFound />
          </div>
        )}

        <div className="mb-6 space-y-2 text-center">
          <h3 className="text-lg font-semibold">Error - {code}</h3>
          <p className="text-grey-600 text-sm">{message}</p>
        </div>

        {code === 500 && <ReloadButton />}
      </div>
    </div>
  );
};

export const ReloadButton = () => {
  const hanldeReload = () => window.location.reload();

  return (
    <Button onClick={hanldeReload} className="pry-btn">
      Reload
    </Button>
  );
};

export const ReloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={60}
    height={60}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.54758 29.2573C9.07216 27.0487 9.9041 24.7578 11.2291 22.4628C17.2166 12.0921 30.467 8.54168 40.8377 14.5292C51.2084 20.5167 54.7588 33.7671 48.7713 44.1378C42.7838 54.5084 29.5334 58.0589 19.1627 52.0714C15.3089 49.8464 12.3899 46.6023 10.5521 42.8854"
      stroke="#98A2B3"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M34.0057 40.17L28.6827 36.9934C27.7555 36.4439 27 35.1218 27 34.04V27"
      stroke="#98A2B3"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.97921 31.9615L5.01106 21"
      stroke="#98A2B3"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.979 31.9617L16.2527 30.1579"
      stroke="#98A2B3"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
