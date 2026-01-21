"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const GoBackBtn = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={`${className} `}>
      <FaArrowLeftLong />
    </button>
  );
};
export default GoBackBtn;
