import React from "react";

const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${className} relative h-16 w-full overflow-hidden rounded bg-gray-200`}
    >
      {/* Static skeleton background */}
      <div className="h-full w-full bg-gray-300" />

      {/* Shimmer animation overlay */}
      <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300" />
    </div>
  );
};

export default Skeleton;
