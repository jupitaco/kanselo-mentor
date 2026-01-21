import React, { Dispatch, ReactNode, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const DropdownWrapper = ({
  trigger,
  children,
  open,
  setOpen,
}: {
  trigger?: ReactNode;
  className?: string;
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="relative w-full">{trigger}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dropdown-content-width-full bg-white p-5"
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownWrapper;
