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

export const formatDate = (date: string, time?: boolean) => {
  return date && time
    ? new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : date
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A";
};

export const formatDateToLocale = (date: Date) => {
  //  will return the date as YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA").format(date);
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

export const queryBuilder = (query: { [key: string]: string }) => {
  const filteredParams = Object.entries(query).filter(
    ([_, v]) => v !== undefined && v !== "undefined" && v !== null && v !== "",
  );

  const params = new URLSearchParams(filteredParams);
  return params;
};

export const getMinutes = (time: string): number => {
  if (!time) return 0;
  // map.(Number) converts the descructure value to number
  const [h, m] = time?.split(":")?.map(Number);
  return h * 60 + m;
};

export const getDiffrence = (start: string, end: string): number => {
  return getMinutes(end) - getMinutes(start);
};

export const formatFileSize = (sizeInBytes: number): string => {
  const KB = 1024;
  const MB = KB * 1024;

  if (sizeInBytes < KB) {
    return `${sizeInBytes} bytes`;
  } else if (sizeInBytes < MB) {
    return `${(sizeInBytes / KB).toFixed(2)} KB`;
  } else {
    return `${(sizeInBytes / MB).toFixed(2)} MB`;
  }
};

export const getUserInitials = (name: string | null | undefined) => {
  if (!name) return "";
  const splitedValues = name?.split(" ");

  const fName = splitedValues[0] || "";
  const lName = splitedValues[1] || "";

  return (fName.slice(0, 1) + lName.slice(0, 1)).toUpperCase();
};

function stringToNumber(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function getAvatarGradient(name: string) {
  const hash = stringToNumber(name);
  const hue = 260;

  const l1 = 40 + (hash % 15);
  const l2 = l1 + 10;

  return {
    background: `linear-gradient(135deg,
      hsl(${hue}, 60%, ${l1}%),
      hsl(${hue}, 60%, ${l2}%)
    )`,
  };
}
