"use client";

import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import Button from "../ui/button";
import FormInput from "../ui/formInput";

import { filterData } from "@/mock";
import { useRouter } from "next/navigation";
import { onboardUserAction } from "@/libs/actions/auth.actions";
import { handleError, handleSuccess } from "@/utils/helper";
import PopoverWrapper from "../ui/popover/popoverWrapper";
import { FaChevronDown, FaX } from "react-icons/fa6";
import { Checkbox } from "../ui/formInput/checkbox/checkbox";

const Onboarding = () => {
  const { push } = useRouter();
  const [industries, setIndustries] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    consultationTitle: "",
    yearsOfExperience: "",
    bio: "",
    consultationFee: "",
  });

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
        handleSuccess(rsp?.message, push, "/dashboard");
      }
    });
  };

  const removeItem = (value: string) => {
    setIndustries((prev) => prev?.filter((i) => i !== value));
  };

  return (
    <form onSubmit={handleSubmit}>
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
          required
        />

        <div className="w-full">
          <label htmlFor="industries"> Industry (s)</label>

          <PopoverWrapper
            className="form-controls mt-2"
            triggerChildren={
              <button className="flex items-center justify-between gap-0.5">
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
          required
        />
      </article>

      <article className="mt-8">
        <Button type="submit" className="pry-btn w-full" loading={isPending}>
          Submit
        </Button>
      </article>
    </form>
  );
};

export default Onboarding;
