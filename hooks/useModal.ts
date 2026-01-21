"use client";
import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});
  const [itemId, setItemId] = useState<string>("");
  const [getData, setGetData] = useState<{
    [key: string]: string | number;
  }>({});

  const openModal = (id: string) => {
    setIsOpen((prev) => ({ ...prev, [id]: true }));
    setItemId(id);
  };

  const closeModal = (id: string) => {
    setIsOpen((prev) => ({ ...prev, [id]: false }));
  };

  const toggleModal = (id: string) => {
    setIsOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return {
    setItemId,
    itemId,
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    getData,
    setGetData,
  };
};
