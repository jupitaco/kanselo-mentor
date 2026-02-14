"use client";
import React from "react";
import Button from "../ui/button";
import FormInput from "../ui/formInput";
import StrongPassword from "../ui/strongPassword";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ImageFileUpload } from "../fileUpload/fileUpload";
import { useGlobalHooks } from "@/hooks/globalHooks";

import { Controller } from "react-hook-form";
import { uploadFilesAction } from "@/libs/actions/auth.actions";
import { handleError } from "@/utils/helper";
import ErrorMessage from "../ui/errorMessage";
import { RadioGroup, RadioGroupItem } from "../ui/formInput/radio/radioGroup";

const SignupForm = () => {
  const {
    formState: { errors, isSubmitting },
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    modifiedCountries,
    stateList,
  } = useAuth();

  const { loading, setLoading } = useGlobalHooks();

  const password = watch("password");
  const profilePhoto = watch("profilePhoto");

  const handleUploadFiles = async (
    e: React.ChangeEvent<HTMLInputElement> | DragEvent,
  ) => {
    const target = e.target as HTMLInputElement;

    setLoading({ ["profilePhoto"]: true });

    if (target.files && target.files.length > 0) {
      const imageFIle = target.files[0];

      try {
        const rsp = await uploadFilesAction(imageFIle);

        if (rsp?.error) {
          handleError(rsp?.message);
          return;
        }

        if (!rsp?.error && rsp?.data) {
          setValue("profilePhoto", rsp?.data[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading({ ["profilePhoto"]: false });
      }
    }
  };

  const removeImage = () => {
    setValue("profilePhoto", "");
  };

  return (
    <form onSubmit={handleSubmit}>
      <article className="flex flex-wrap justify-between gap-4">
        <FormInput
          id="fullName"
          type="text"
          label="Full Name"
          placeholder="Enter full name"
          className="w-full"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <article className="flex w-full flex-col gap-3">
          <h5 className="text-grey-500 text-sm font-medium">
            Profile Photo (Optional)
          </h5>
          <ImageFileUpload
            id="profilePhoto"
            loading={loading}
            uploadFiles={handleUploadFiles}
            uploaddedFileUrl={profilePhoto}
            removeFile={removeImage}
            imgClassName="object-cover"
            singleUpload
          />

          {errors?.profilePhoto?.message && (
            <ErrorMessage message={errors?.profilePhoto?.message} />
          )}
        </article>

        <FormInput
          id="email"
          type="email"
          label="Email address"
          placeholder="Enter your email"
          className="w-full"
          error={errors.email?.message}
          {...register("email")}
        />

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <FormInput
              id="country"
              type="shadSelect"
              label="Country"
              placeholder="Select Country"
              shadcnSelectData={modifiedCountries}
              className="w-full"
              error={errors.country?.message}
              value={field.value}
              onSelectItem={field.onChange}
            />
          )}
        />

        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <FormInput
              id="state"
              type="shadSelect"
              label="State"
              placeholder="Select state"
              shadcnSelectData={stateList}
              className="w-full"
              error={errors.state?.message}
              value={field.value || stateList?.[0]?.value}
              onSelectItem={field.onChange}
            />
          )}
        />

        <FormInput
          id="city"
          type="text"
          label="City"
          placeholder="Enter city"
          className="w-full"
          error={errors.city?.message}
          {...register("city")}
        />

        <FormInput
          id="phoneNumber"
          type="text"
          label="Phone Number"
          placeholder="Enter number"
          className="w-full"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />

        <FormInput
          id="password"
          type="password"
          label="Create Password"
          placeholder="Create your password"
          className="w-full"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="space-y-4">
          <small className="text-grey-400">
            Min 8 Characters with a combination of letters and numbers
          </small>
          {password !== "" && (
            <StrongPassword password={password} className="mt-2" />
          )}
        </div>

        <FormInput
          id="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="Confirm password"
          className="w-full"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <div className={`${errors.consent ? "errors rounded-md p-4" : ""}`}>
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value ? "true" : "false"}
                className="flex gap-2"
              >
                <RadioGroupItem value="true" id="consent" />
                <label htmlFor="consent">
                  <span className="text-grey-400">
                    By creating your account, you agree to our{" "}
                    <span className="text-grey-500">Terms and Conditions</span>{" "}
                    & <span className="text-grey-500">Privacy Policy</span>
                  </span>
                </label>
              </RadioGroup>
            )}
          />
        </div>

        {errors.consent?.message && (
          <ErrorMessage message={errors.consent?.message} />
        )}
      </article>

      <article className="mt-8">
        <Button type="submit" className="pry-btn w-full" loading={isSubmitting}>
          Sign Up
        </Button>
      </article>

      <article className="mt-4 w-full text-center">
        <h5 className="text-grey-400 text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary">
            Register
          </Link>
        </h5>
      </article>
    </form>
  );
};

export default SignupForm;
