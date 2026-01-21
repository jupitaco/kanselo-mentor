import { z } from "zod";

export const SignupSchema = z
  .object({
    fullName: z.string().min(1, "Please enter full name"),
    profileImg: z.string().optional(),
    email: z.email("Invalid email"),
    country: z.string().min(1, "Please select country"),
    state: z.string().min(1, "Please select state"),
    city: z.string().min(1, "Please enter city"),
    phoneNumber: z.string().optional(),
    password: z.string().min(1, "Please enter password"),
    confirmPassword: z.string().min(1, "Please enter confirm password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This will attach the error to the confirmPassword field
  });

export type SignupTypeValues = z.infer<typeof SignupSchema>;
