import { toast } from "@/hooks/useToast";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleSuccess = (
  message: string,
  push?: (href: string, options?: NavigateOptions) => void,
  path?: string,
) => {
  if (path && push) {
    toast({
      variant: "default",
      title: "Success",
      description: message,
    });
    push(path);
  } else {
    toast({
      variant: "default",
      title: "Success",
      description: message,
    });
  }
};

export const handleError = (message: string) => {
  toast({
    variant: "destructive",
    title: "Failed",
    description: message,
  });
};

export const formatNumInThousands = (number: number | string) => {
  const numericValue = Number(number);
  if (Number.isNaN(numericValue)) {
    return "0.0";
  }
  // convert to string and split into different part
  const [intPart, originalDecimalPart] = number?.toString()?.split(".");

  // reverse to start formartting from right hand
  const reversedNum = intPart.split("").reverse().join("");

  // loop through the value and add , after every 3 chars
  const formattedVal = reversedNum
    .match(/.{1,3}/g)
    ?.join(",")
    .split("")
    .reverse()
    .join("");

  let decimalPart = originalDecimalPart || "00";
  if (decimalPart.length === 1) {
    decimalPart += "0";
  }

  return formattedVal + "." + Number(decimalPart);
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getStatusColors = (status: string) => {
  const statusLower = status?.toLowerCase();

  if (
    [
      "active",
      "approved",
      "completed",
      "successful",
      "success",
      "verified",
      "confirmed",
      "requested",
    ].includes(statusLower)
  ) {
    return "success";
  }

  if (
    ["declined", "failed", "timedout", "rejected", "cancelled"]?.includes(
      statusLower,
    )
  ) {
    return "failed";
  }

  if (["pending", "processing"]?.includes(statusLower)) {
    return "warning";
  }

  return "fall-back";
};
