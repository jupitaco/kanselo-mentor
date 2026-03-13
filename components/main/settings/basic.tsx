"use client";

import Button from "@/components/ui/button";
import FormInput from "@/components/ui/formInput";
import { updateUserAction } from "@/libs/actions/auth.actions";
import { UserDataAndAccessToken } from "@/types/auths";
import { ActionFormStatus } from "@/types/global";
import { handleError, handleSuccess } from "@/utils/helper";
import React, {
  SyntheticEvent,
  useActionState,
  useEffect,
  useMemo,
} from "react";
import countries from "@/utils/countriesminified.json";
import states from "@/utils/statesminified.json";
import { useSettingsContext } from "@/context/settingsContext";

export const Basic = () => {
  const { edit, setEdit, formData, setFormData } = useSettingsContext();

  const handleChange = (e: SyntheticEvent) => {
    const { id, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange =
    (field: "country" | "state") => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const initialStatus: ActionFormStatus & { data: UserDataAndAccessToken } = {
    error: false,
    message: "",
    data: {} as UserDataAndAccessToken,
  };

  const [state, formAction, isPending] = useActionState(
    updateUserAction,
    initialStatus,
    "/",
  );

  useEffect(() => {
    if (state?.error) {
      handleError(state?.message);
    } else if (state?.message) {
      handleSuccess(state?.message);
      setTimeout(() => {
        setEdit(false);
      }, 10);
    }
  }, [state, edit, setEdit]);

  const modifiedCountries = useMemo(
    () =>
      countries.map((item) => {
        return {
          label: item?.name,
          value: item?.name,
        };
      }),
    [],
  );

  const stateList = useMemo(() => {
    let stateData;
    const countryId = countries.find((i) => i.name === formData?.country)?.id;
    const matched = states.find((i) => i.id === countryId)?.states;

    if (matched) {
      stateData = matched.map(({ name }) => {
        return {
          label: name,
          value: name,
        };
      });
    }

    return stateData;
  }, [formData?.country]);

  return (
    <form action={formAction} className="w-full space-y-4">
      <section className="space-y-4">
        <FormInput
          id="profilePhoto"
          name="profilePhoto"
          type="hidden"
          value={formData?.profilePhoto}
        />
        <FormInput
          id="fullName"
          name="fullName"
          type="text"
          label="Full Name"
          placeholder="Enter"
          value={formData?.fullName}
          onChange={handleChange}
          disabled={!edit}
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter"
          value={formData?.email}
          disabled
        />

        <FormInput
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          label="Phone Number"
          placeholder="Enter"
          value={formData?.phoneNumber}
          onChange={handleChange}
          disabled={!edit}
        />

        <FormInput
          id="country"
          name="country"
          type="shadSelect"
          label="Country"
          placeholder="Select"
          value={formData?.country}
          shadcnSelectData={modifiedCountries}
          onSelectItem={handleSelectChange("country")}
          disabled={!edit}
        />

        <FormInput
          id="state"
          name="state"
          type="shadSelect"
          label="State"
          placeholder="Select"
          value={formData?.state}
          shadcnSelectData={stateList}
          onSelectItem={handleSelectChange("state")}
          disabled={!edit}
        />
        <FormInput
          id="city"
          name="city"
          type="text"
          label="City"
          placeholder="Enter city"
          value={formData?.city}
          onChange={handleChange}
          disabled={!edit}
        />

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
      </section>
    </form>
  );
};
