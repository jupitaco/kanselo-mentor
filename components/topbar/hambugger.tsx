"use client";
import { useModalContext } from "@/context/modalContext";

const Hambugger = () => {
  const { handleShow, toggle } = useModalContext();
  return (
    <div onClick={handleShow} className={toggle ? "open" : "ham"} id="navbar">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Hambugger;
