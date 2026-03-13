"use client";

import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import { Checkbox } from "@/components/ui/formInput/checkbox/checkbox";
import PopoverWrapper from "@/components/ui/popover/popoverWrapper";
import { useSettingsContext } from "@/context/settingsContext";
import { onboardUserAction } from "@/libs/actions/auth.actions";
import { filterData } from "@/mock";
import { handleError, handleSuccess } from "@/utils/helper";
import React, { ChangeEvent, SyntheticEvent, useTransition } from "react";
import { useState } from "react";
import { FaChevronDown, FaX } from "react-icons/fa6";

export const Business = () => {
  const { edit, setEdit, formData, setFormData } = useSettingsContext();

  console.log("formd>>", formData);

  const [industries, setIndustries] = useState<string[]>(
    formData?.industries || [],
  );
  const [isPending, startTransition] = useTransition();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectIndurstires = (value: string) => {
    setIndustries((prev) => {
      const isExist = prev?.includes(value);
      return isExist ? prev.filter((text) => text !== value) : [...prev, value];
    });
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      consultationTitle: formData?.consultationTitle,
      yearsOfExperience: Number(formData?.yearsOfExperience),
      bio: formData?.bio,
      consultationFee: Number(formData?.consultationFee),
      industries,
    };

    startTransition(async () => {
      const rsp = await onboardUserAction(payload);

      if (rsp?.error) {
        handleError(rsp?.message);
        return;
      } else {
        handleSuccess(rsp?.message);
        setEdit(false);
      }
    });
  };

  const removeItem = (value: string) => {
    setIndustries((prev) => prev?.filter((i) => i !== value));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <article className="flex flex-wrap justify-between gap-4">
        <FormInput
          id="yearsOfExperience"
          name="yearsOfExperience"
          type="number"
          label="Years of experience"
          placeholder="Enter your years of experience e.g: 2"
          className="w-full"
          value={formData?.yearsOfExperience}
          onChange={handleChange}
          disabled={!edit}
          required
        />

        <div className="w-full">
          <label htmlFor="industries"> Industry (s)</label>

          <PopoverWrapper
            className="form-controls mt-2"
            triggerChildren={
              <button
                className="flex items-center justify-between gap-0.5"
                disabled={!edit}
              >
                <>
                  {industries?.length > 0 && (
                    <ul className="flex flex-1 flex-wrap gap-2">
                      {industries?.map((item, idx) => (
                        <li
                          key={idx}
                          className="bg-primary text-grey-100 flex cursor-pointer items-center gap-2 rounded-md p-2 text-xs capitalize"
                          onClick={() => removeItem(item)}
                        >
                          {item} <FaX />
                        </li>
                      ))}
                    </ul>
                  )}
                </>{" "}
                Select <FaChevronDown className="text-grey-400" />
              </button>
            }
            contentClassName="w-[var(--radix-popover-trigger-width)] card"
          >
            <ul className="max-h-60 space-y-3 overflow-y-auto">
              {filterData.map(({ label, value }, idx) => {
                return (
                  <li
                    key={idx}
                    className="hover:bg-grey-100 flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-sm"
                    onClick={() => handleSelectIndurstires(value)}
                  >
                    <Checkbox checked={industries.includes(value)} /> {label}
                  </li>
                );
              })}
            </ul>
          </PopoverWrapper>
        </div>

        <FormInput
          id="bio"
          name="bio"
          type="textarea"
          label="Bio"
          placeholder="Enter bio"
          className="w-full"
          value={formData?.bio}
          onChange={handleChange}
          disabled={!edit}
          required
        />

        <FormInput
          id="consultationTitle"
          name="consultationTitle"
          type="text"
          label="Consultation title"
          placeholder="Enter title"
          className="w-full"
          value={formData?.consultationTitle}
          onChange={handleChange}
          disabled={!edit}
          required
        />

        <FormInput
          id="consultationFee"
          name="consultationFee"
          type="number"
          label="Consultation fee (per session)"
          placeholder="Enter fee"
          className="w-full"
          value={formData?.consultationFee}
          onChange={handleChange}
          disabled={!edit}
          required
        />
      </article>

      <div className="mt-9 flex items-center justify-end pt-5">
        {edit ? (
          <div className="flex gap-3">
            <Button
              className="outline-btn"
              type="button"
              onClick={() => setEdit(!edit)}
            >
              Cancel
            </Button>
            <Button className="pry-btn" type="submit" loading={isPending}>
              Save Changes
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button
              className="outline-btn text-center"
              onClick={() => setEdit(!edit)}
              type="button"
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};
