import { cn } from "@/libs/utils";
import React from "react";

const TableLoading = ({
  className,
  num,
}: {
  className?: string;
  num?: number;
}) => {
  return (
    <div className={cn("grid grid-cols-1 gap-3", className)}>
      {[...Array(num ? num : 9)].map((_, index) => (
        <div
          key={index}
          className="h-16 w-full animate-pulse rounded bg-gray-300"
        />
      ))}
    </div>
  );
};

export default TableLoading;
