import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, SignupTypeValues } from "@/schemas/signup.schemas";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import countries from "@/utils/countriesminified.json";
import states from "@/utils/statesminified.json";
import { useAuthContext } from "@/context/authContext";
import { signupAction } from "@/libs/actions/auth.actions";
import { handleError, handleSuccess } from "@/utils/helper";

export const useAuth = () => {
  const { setUserData } = useAuthContext();
  const { push } = useRouter();

  const initialValues: SignupTypeValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    profilePhoto: "",
    country: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
    consent: "",
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState,
    watch,
    reset,
    control, setValue,
  } = useForm<SignupTypeValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: initialValues,
  });
  const country = watch("country");

  const onSubmit = async (data: SignupTypeValues) => {

    const signupData = {
      fullName: data.fullName,
      profilePhoto: data.profilePhoto || "",
      email: data.email,
      country: data.country,
      state: data.state,
      city: data.city,
      phoneNumber: data.phoneNumber || "",
      password: data.password,
    };

    const rsp = await signupAction(signupData)
    if (rsp?.error) {
      handleError(rsp?.message);
    } else if (!rsp?.error && rsp?.message) {
      setUserData((prev) => ({
        ...prev,
        email: String(rsp?.data?.user?.email),
        id: String(rsp?.data?.user?._id),
      }));
      handleSuccess(
        rsp?.message,
        push,
        `/verify-email?email=${rsp?.data?.user?.email}`,
      );
    }

  };


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
    const countryId = countries.find((i) => i.name === country)?.id;
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
  }, [country]);


  useEffect(() => {
    if (stateList && stateList?.length > 0) {
      setValue('state', stateList?.[0]?.value);
    }
  }, [stateList])

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    getValues,
    formState,
    reset,
    watch,
    control, setValue, stateList, modifiedCountries
  };
};
