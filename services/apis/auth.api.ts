import {
  ApiResponse,
  AuthResponse,
  Login,
  PasswordUpdate,
  ResetPassword,
  SignUpType,
  UserData,
  VerifyOTP,
  VerifyOTPResponse,
} from "@/types/auths";
import { Api } from "./api";
import { getUser } from "../session";

export const signupApi = (body: SignUpType) => {
  return Api.post<SignUpType, AuthResponse>("/user/auth/mentor/signup", body);
};

export const signinApi = (body: Login) => {
  return Api.post<Login, AuthResponse>("/user/auth/login", body);
};

export const verifyEmailApi = (body: VerifyOTP) => {
  return Api.post<VerifyOTP, VerifyOTPResponse>(
    "/user/verify/email-or-phone",
    body,
  );
};

export const resendOTPApi = (email: string) => {
  return Api.post<void, VerifyOTPResponse>(`/user/resend-otp?email=${email}`);
};

export const updateUserApi = async (body: UserData) => {
  const session = await getUser();
  return Api.patch<UserData, AuthResponse>(
    `/user/${session?._id}/profile`,
    body,
    true,
  );
};

export const getCurrentUserApi = async () => {
  const session = await getUser();
  return Api.get<{ data: UserData }>(`/user/user-id/${session?._id}`, true);
};

export const currentUserUpdatePasswordApi = async (body: PasswordUpdate) => {
  const session = await getUser();

  return Api.patch<PasswordUpdate, AuthResponse>(
    `/user/${session?._id}/change-password/dashboard`,
    body,
    true,
  );
};

export const forgotPasswordRequestApi = ({ email }: { email: string }) => {
  return Api.post<{ email: string }, AuthResponse>(`/user/password/forget`, {
    email,
  });
};

export const verifyCodeApi = (body: VerifyOTP) => {
  return Api.post<VerifyOTP, VerifyOTPResponse>(
    "/user/password/verify-code",
    body,
  );
};

export const passwordResetApi = (body: ResetPassword) => {
  return Api.post<ResetPassword, AuthResponse>(`/user/password/reset`, body);
};

export const fileUploadApi = (body: FormData) => {
  return Api.post<FormData, AuthResponse & { data: string[] }>(
    `/upload-files`,
    body,
    false,
    "multipart/form-data",
  );
};
