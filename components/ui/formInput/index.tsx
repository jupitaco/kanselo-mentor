"use client";

import React, { ChangeEvent, useState, type JSX, type ReactNode } from "react";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import ErrorMessage from "../errorMessage";
import { Checkbox } from "./checkbox/checkbox";
import { DatePicker } from "./datePicker/datePicker";
import SelectInput, { ItemsType } from "./select/selectInput";

export interface IFormInputProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
> {
  id: string;
  label?: string | ReactNode;
  name?: string;
  error?: string;
  value?: string | number | readonly string[] | undefined;
  DateTimeValue?: Date | undefined;
  type?:
  | React.HTMLInputTypeAttribute
  | "textarea"
  | "select"
  | "shadSelect"
  | "date"
  | "time";
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
  onChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  onDateChange?: (date: Date | undefined) => void;
  onSelectItem?: (value: string) => void;
  onChecked?: (checked: boolean) => void;
  checkValue?: boolean;
  icon?: JSX.Element | string;
  required?: boolean;
  disabled?: boolean;
  shadcnSelectData?: ItemsType[];
}

const FormInput = ({
  className,
  inputClassName,
  labelClassName,
  label,
  type,
  id,
  name,
  onChange,
  onDateChange,
  onChecked,
  onSelectItem,
  icon,
  placeholder,
  required,
  disabled,
  value,
  error,
  checkValue,
  DateTimeValue,
  shadcnSelectData,
  ...rest
}: IFormInputProps) => {
  const [openDate, setOpenDate] = React.useState(false);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {},
  );

  const handleShowPassword = (id: string) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (onDateChange) {
      onDateChange(date);
      setOpenDate(false);
    }
  };

  const handleShadSelectChange = (value: string) => {
    if (onSelectItem) {
      onSelectItem(value);
    }
  };

  return (
    <div className={`${error ? "space-y-2" : ""} ${className}`}>
      {type !== "checkbox" && type !== "radio" && label && (
        <label
          htmlFor={id}
          className={`${labelClassName} mb-2 flex items-center gap-2`}
        >
          <span>{label}</span>
        </label>
      )}

      {icon && <span>{icon}</span>}

      {type === "date" ? (
        <DatePicker
          id={name}
          value={DateTimeValue}
          placeholder={placeholder || ""}
          openDate={openDate}
          setOpenDate={setOpenDate}
          onSelect={handleDateChange}
          className={`m-0! w-full ${inputClassName}`}
          disabled={Boolean(disabled)}
          required={required}
          error={error}
        />
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={6}
          onChange={onChange}
          className={`${error ? "errors" : ""} form-controls ${inputClassName}`}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          required={required}
          {...rest}
        ></textarea>
      ) : type === "shadSelect" ? (
        <SelectInput
          name={String(name)}
          placeholder={placeholder || ""}
          value={String(value)}
          data={shadcnSelectData || []}
          onChange={handleShadSelectChange}
          className={`${error ? "errors m-0!" : ""} w-full ${inputClassName}`}
          required={required}
          disabled={disabled}
        />
      ) : type === "checkbox" || type === "radio" ? (
        <>
          <Checkbox
            id={id}
            name={name}
            onCheckedChange={onChecked}
            className={error ? "errors m-0!" : "m-0!"}
            disabled={disabled}
            checked={checkValue}
            required={required}
          />
          <label htmlFor={id} className={`${labelClassName} m-0!`}>
            {label}
            {""}
          </label>
        </>
      ) : type === "password" ? (
        <div className="relative">
          <input
            id={id}
            name={name}
            type={showPassword[id] ? "text" : "password"}
            onChange={onChange}
            className={`${error ? "errors" : ""
              } form-controls ${inputClassName}`}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            required={required}
            {...rest}
          />
          <span
            className="absolute top-[35%] right-6 cursor-pointer"
            onClick={() => handleShowPassword(id)}
          >
            {showPassword[id] ? (
              <BsFillEyeFill className="text-grey-200" />
            ) : (
              <BsFillEyeSlashFill className="text-grey-200" />
            )}
          </span>
        </div>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          className={`${error ? "errors" : ""} form-controls ${inputClassName}`}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          required={required}
          {...rest}
        />
      )}

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default FormInput;
