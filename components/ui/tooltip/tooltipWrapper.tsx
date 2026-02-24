import { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export function TooltipWrapper({
  title,
  className,
  children,
}: {
  title: string | ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{title}</TooltipTrigger>
      <TooltipContent className={className}>{children}</TooltipContent>
    </Tooltip>
  );
}
