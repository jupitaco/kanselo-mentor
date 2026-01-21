"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/libs/utils";
import { ClientSearch } from "./clientSearch";

export type ItemsType = {
  label: string;
  value: string | number;
  icon?: ReactNode;
};

type SelectInputTypes = {
  label?: string | ReactNode;
  name: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  data: ItemsType[];
  search?: boolean;
  className?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
};

export default function SelectInput({
  label,
  name,
  value,
  placeholder,
  onChange,
  data,
  search,
  error,
  className,
  disabled,
  required,
}: SelectInputTypes) {
  const [query, setQuery] = useState("");
  const [filteredData, setFiltereData] = useState<ItemsType[]>([]);

  useEffect(() => {
    if (data && query) {
      const filter = data?.filter((f) =>
        f?.label?.toLowerCase()?.includes(query),
      );
      setFiltereData(filter);
    } else {
      setFiltereData(data);
    }
  }, [data, query]);

  return (
    <div className="flex flex-col gap-2">
      {label && <label htmlFor={name}>{label}</label>}
      <Select
        name={name}
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        required={required}
      >
        <SelectTrigger
          className={cn("form-controls", error ? "errors" : "", className)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {search && <ClientSearch query={query} setQuery={setQuery} />}

          {query && filteredData?.length === 0 && (
            <p className="p-2">No result matching your search query</p>
          )}
          {filteredData.map((method) => {
            return (
              <SelectItem key={method.value} value={method.value?.toString()}>
                <div className="flex items-center gap-2">
                  {method?.icon && method?.icon} {method.label}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
