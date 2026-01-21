"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const GoBackBtn = ({ className, title }: { title?: string; className?: string }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className={`${className} flex items-center justify-center gap-5`}>
      <FaArrowLeftLong /> {title && <span>{title}</span>}
    </button>
  );
};
export default GoBackBtn;
