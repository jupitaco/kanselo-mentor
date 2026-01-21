"use client";
import { cn } from "@/libs/utils";
import { BsStarFill } from "react-icons/bs";

interface IRatings {
  className?: string;
  rating: number;
  handleStarClick?: (index: number) => void;
}

export const StarRatings: React.FC<IRatings> = ({
  className,
  rating,
  handleStarClick,
}) => {
  const getColor = (index: number) => {
    return index + 1 <= rating ? "rated" : "noRating";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {[...Array(5)].map((_, index) => (
        <BsStarFill
          key={index}
          className={`star ${getColor(index)}`}
          onClick={() => handleStarClick && handleStarClick(index)}
        />
      ))}
    </div>
  );
};
