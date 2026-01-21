import React, { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { FaChevronDown } from "react-icons/fa6";

const PopoverWrapper = ({
  icon,
  triggerChildren,
  align = "center",
  children,
}: {
  icon?: React.ReactNode;
  triggerChildren?: ReactNode;
  className?: string;
  children: ReactNode;
  align?: "start" | "center" | "end";
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {triggerChildren ? (
          triggerChildren
        ) : (
          <button className="flex items-center gap-0.5">
            {icon ? icon : <FaChevronDown />}
          </button>
        )}
      </PopoverTrigger>

      <PopoverContent align={align} className="w-full bg-white">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverWrapper;
