"use client";
import React, { FormEvent, useMemo } from "react";
import Button from "../ui/button";
import FormInput from "../ui/formInput";
import StrongPassword from "../ui/strongPassword";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import ImageContainer from "../cloudinary/imageContainer";
import { useGlobalHooks } from "@/hooks/globalHooks";
import { useRouter } from "next/navigation";

import countries from "@/utils/countries.json";
import { Controller } from "react-hook-form";

const SignupForm = () => {
  const {
    formState: { errors },
    register,
    watch,
    handleSubmit,
    control,
  } = useAuth();
  const { loading } = useGlobalHooks();
  const { push } = useRouter();

  const modifiedCountries = useMemo(
    () =>
      countries.map(({ name }) => {
        return {
          label: name,
          value: name,
        };
      }),
    [],
  );

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

  const password = watch("password");
  const country = watch("country");

  const cities = useMemo(() => {
    let citiesData;
    const matched = countries.find((i) => i.name === country)?.states;

    if (matched) {
      citiesData = matched.map(({ name }) => {
        return {
          label: name,
          value: name,
        };
      });
    }

    return citiesData;
  }, [country]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check native validation first
    if (e.currentTarget.checkValidity()) {
      // If native validation passes, run react-hook-form validation
      handleSubmit((data) => {
        console.log(data);
        push("/verify-email");
      })(e);
    } else {
      // Native validation failed, let browser show the warning
      e.currentTarget.reportValidity();
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
          <ImageContainer
            id="profileImg"
            loading={loading}
            // uploadFiles={(e) => handleUploadFiles(e, "storeImageUrl")}
            // images={values?.storeImageUrl}
            singleImage
          // removeImage={() => {
          //   handleChange({
          //     target: {
          //       name: "storeImageUrl",
          //       value: "",
          //     },
          //   });
          // }}
          />
          {/*
        {customErrors?.error && (
          <ErrorMessage message={customErrors?.errMessage} />
        )} */}
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

        <FormInput
          id="phoneNumber"
          type="tel"
          label="Phone number"
          placeholder="Enter your phone number"
          className="w-full"
          error={errors.phoneNumber?.message}
          {...register("phoneNumber")}
        />

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <FormInput
              id="country"
              type="shadSelect"
              label="Country"
              placeholder="Select country"
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
              shadcnSelectData={cities}
              className="w-full"
              error={errors.state?.message}
              value={field.value || ""}
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

        <div className="flex w-full gap-3">
          <div>
            <input type="radio" required />
          </div>

          <label htmlFor="">
            <span className="text-grey-400">
              By creating your account, you agree to our{" "}
              <span className="text-grey-500">Terms and Conditions</span> &{" "}
              <span className="text-grey-500">Privacy Policy</span>
            </span>
          </label>
        </div>
      </article>

      <article className="mt-8">
        <Button
          type="submit"
          className="pry-btn w-full"
        // loading={isPending}
        >
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
