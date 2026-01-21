import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, SignupTypeValues } from "@/schemas/signup.schemas";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  //   const { push } = useRouter();
  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    password: "",
    confirmPassword: "",
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState,
    watch,
    reset,
    control,
  } = useForm<SignupTypeValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: initialValues,
  });

  //   const onSubmit = (data: SignupTypeValues) => {
  //     console.log(data);
  //     push("/verify-email");
  //   };
  return {
    register,
    handleSubmit,
    getValues,
    formState,
    reset,
    watch,
    control,
  };
};
