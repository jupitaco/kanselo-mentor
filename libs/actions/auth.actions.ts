"use server";
import {
  currentUserUpdatePasswordApi,
  forgotPasswordRequestApi,
  passwordResetApi,
  signinApi,
  signupApi,
  updateUserApi,
  verifyEmailApi,
  verifyCodeApi,
  fileUploadApi,
  resendOTPApi,
} from "@/services/apis/auth.api";
import { logout, setCookie } from "@/services/session";
import {
  Login,
  PasswordUpdate,
  ResetPassword,
  SignUpType,
  UserData,
  VerifyOTP,
} from "@/types/auths";
import { ActionFormStatus } from "@/types/global";
import { revalidatePath } from "next/cache";

export const signupAction = async (body: SignUpType) => {
  try {
    const rsp = await signupApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    const { user, token } = rsp?.body?.data;

    await setCookie({ token, user });

    return {
      error: false,
      message: rsp?.body?.message || "Account created successfully",
      data: rsp?.body?.data,
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const signInAction = async (_: ActionFormStatus, body: FormData) => {
  const rawData = {
    email: body.get("email"),
    password: body.get("password"),
  };

  try {
    const rsp = await signinApi(rawData as Login);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    const { user, token } = rsp?.body?.data;

    const userdata = {
      _id: user?._id,
      fullName: user?.fullName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      country: user?.country,
      state: user?.state,
      city: user?.city,
      profilePhoto: user?.profilePhoto,
    };

    await setCookie({ token, user: userdata as UserData });

    // if (rsp?.body?.data?.user?.status) {
    //   await setCookie({ token, user: userData });
    // }

    return {
      error: false,
      message: "You have successfully logged in",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const verifyEmailAction = async (body: VerifyOTP) => {
  try {
    const rsp = await verifyEmailApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message || "Email verified successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const updateUserAction = async (_: ActionFormStatus, body: FormData) => {
  const rawData = {
    fullName: body.get("fullName"),
    profilePhoto: body.get("profilePhoto"),
    country: body.get("country"),
    state: body.get("state"),
    city: body.get("city"),
  };

  try {
    const rsp = await updateUserApi(rawData as UserData);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/settings");

    return {
      error: false,
      message: rsp?.body?.message || "Email verified successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const onboardUserAction = async (body: Partial<UserData>) => {
  try {
    const rsp = await updateUserApi(body as UserData);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message || "User informations updated  successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const currentUserUpdatePasswordAction = async (
  _: ActionFormStatus,
  body: FormData,
) => {
  const rawData = {
    oldPassword: body.get("oldPassword"),
    newPassword: body.get("newPassword"),
  };

  const confirmPass = body.get("confirmPassword") as string;

  if (confirmPass !== rawData?.newPassword)
    return {
      error: true,
      message: "Your password doesn't match",
    };

  try {
    const rsp = await currentUserUpdatePasswordApi(rawData as PasswordUpdate);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/account");

    return {
      error: false,
      message: rsp?.body?.message || "Email verified successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const forgotPasswordRequestAction = async (
  _: ActionFormStatus,
  body: FormData,
) => {
  try {
    const rsp = await forgotPasswordRequestApi({
      email: body.get("email") as string,
    });

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message || "Email verified successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const verifyCodeAction = async (body: VerifyOTP) => {
  try {
    const rsp = await verifyCodeApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message || "Email verified successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const resendOTPAction = async (email: string) => {
  try {
    const rsp = await resendOTPApi(email);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message || "Code re-sent successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const passwordResetAction = async (
  _: ActionFormStatus,
  body: FormData,
) => {
  const rawData = {
    code: body.get("code"),
    email: body.get("email"),
    password: body.get("password"),
  };

  try {
    const rsp = await passwordResetApi(rawData as ResetPassword);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message || "Password reset successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const uploadFilesAction = async (file: File) => {
  // apend the uploaded file
  const formData = new FormData();
  formData.append("files[]", file);

  try {
    const rsp = await fileUploadApi(formData);

    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: "File uploaded successfully",
      data: rsp?.body?.data,
    };
  } catch (error) {
    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const logoutAction = async () => {
  await logout();
};
