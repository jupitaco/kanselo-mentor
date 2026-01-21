"use client";

import { useState } from "react";
import Button from "../ui/button";
import FormInput from "../ui/formInput";

import { filterData } from "@/mock";

const Onboarding = () => {
  const [select, setSelect] = useState<string>("");

  // useEffect(() => {
  //   if (state?.error) {
  //     handleError('Signup', state?.message);
  //   } else if (!state?.error && state?.message) {
  //     setUserData((prev) => ({
  //       ...prev,
  //       email: String(state?.data?.user?.email),
  //       id: String(state?.data?.user?._id),
  //     }));
  //     handleSuccess(
  //       'Signup',
  //       state?.message,
  //       push,
  //       `/verify-email?email=${state?.data?.user?.email}`,
  //     );
  //   }
  // }, [state, push, setUserData]);

  return (
    <form>
      <article className="flex flex-wrap justify-between gap-4">
        <FormInput
          id="yearsOfExperience"
          name="yearsOfExperience"
          type="text"
          label="Years of experience"
          placeholder="Enter your years of experience"
          className="w-full"
          required
        />

        <FormInput
          id="industry"
          name="industry"
          type="shadSelect"
          label="Industry"
          placeholder="Select"
          value={select}
          shadcnSelectData={filterData}
          onSelectItem={(e) => setSelect(e)}
          className="w-full"
          required
        />

        <FormInput
          id="bio"
          name="bio"
          type="textarea"
          label="Bio"
          placeholder="Enter bio"
          className="w-full"
          required
        />

        <FormInput
          id="consultationFee"
          name="consultationFee"
          type="number"
          label="Consultation fee (per session)"
          placeholder="Enter fee"
          className="w-full"
          required
        />
      </article>

      <article className="mt-8">
        <Button
          link
          href="/dashboard"
          // type="submit"
          className="pry-btn w-full"
        // loading={isPending}
        >
          Submit
        </Button>
      </article>
    </form>
  );
};

export default Onboarding;
