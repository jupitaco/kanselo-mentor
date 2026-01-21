"use client";

import React from "react";
import LogoutBtn from "./logoutBtn";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/modals/dialog";
import { useModal } from "@/hooks/useModal";
import Button from "../ui/button";
import { LogOutIcon } from "@/public/svgs/svgs";
import Image from "next/image";

const Logout = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return (
    <>
      <button
        className="sidebarNotActive flex cursor-pointer items-center gap-2"
        onClick={() => openModal("logout")}
      >
        <LogOutIcon />
        <span className="text-grey-400 text-sm font-semibold"> Logout</span>
      </button>
      <Dialog
        open={isOpen["logout"]}
        onOpenChange={(isOpen) => !isOpen && closeModal("logout")}
      >
        <DialogContent className="space-y-3 bg-white py-4 sm:max-w-xl">
          <WarningIcon />
          <DialogHeader className="items-center text-center">
            <DialogTitle className="text-lg">Logout</DialogTitle>
            <DialogDescription className="text-grey-400">
              Are you sure you want to logout?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="grid grid-cols-2 gap-5">
            <DialogClose asChild>
              <Button type="button" className="outline-btn w-full">
                Cancel
              </Button>
            </DialogClose>
            <LogoutBtn />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Logout;

export const WarningIcon = () => {
  return (
    <figure className="flex justify-center">
      <Image src="/images/warning.png" alt="" width={92} height={92} />
    </figure>
  );
};
