"use client";

import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import { filterData } from "@/mock";
import { allImages } from "@/public/images/images";
import Image from "next/image";
import React from "react";
import { useState } from "react";

export const Business = () => {
  // const [formData, setFormData] = useState({
  //   fullName: userData?.fullName || '',
  //   email: userData?.email || '',
  // });
  const [edit, setEdit] = useState(false);
  const [select, setSelect] = useState<string>("");


  // const handleChange = (
  //   e: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  // ) => {
  //   const { id, value } = e.target as HTMLInputElement;
  //   setFormData((prev) => ({ ...prev, [id]: value }));
  // };

  // const initialStatus: ActionFormStatus & { data: UserDataAndAccessToken } = {
  //   error: false,
  //   message: '',
  //   data: {} as UserDataAndAccessToken,
  // };

  // const updateUserWithId = (state: ActionFormStatus, payload: FormData) => {
  //   return updateUserAction(state, userData?._id as string, payload);
  // };

  // const [state, formAction, isPending] = useActionState(
  //   updateUserWithId,
  //   initialStatus,
  //   '/',
  // );

  // useEffect(() => {
  //   if (state?.error) {
  //     handleError('Profile Update', state?.message);
  //   } else if (state?.message) {
  //     handleSuccess('Profile Update', state?.message);
  //     setTimeout(() => {
  //       setEdit(false);
  //     }, 10);
  //   }
  // }, [state, edit]);

  return (
    <form
      // action={formAction}
      className="w-full space-y-4"
    >
      <section className="space-y-4">
        <article className="flex flex-wrap justify-between gap-4">
          <FormInput
            id="yearsOfExperience"
            name="yearsOfExperience"
            type="text"
            label="Years of experience"
            placeholder="Enter your years of experience"
            className="w-full"
            disabled={!edit}
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
            disabled={!edit}
            required
          />

          <FormInput
            id="bio"
            name="bio"
            type="textarea"
            label="Bio"
            placeholder="Enter bio"
            className="w-full"
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
              <Button
                className="pry-btn"
                type="submit"
              // loading={isPending}
              >
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
      </section>
    </form>
  );
};

export const ChangeUserProfile = () => {
  return (
    <figure className="relative size-40 overflow-hidden rounded-full">
      <Image
        src={allImages.avatar}
        alt=""
        fill
        sizes="100%"
        className="object-cover"
      />
    </figure>
  );
};
