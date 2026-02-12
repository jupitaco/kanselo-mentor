export type ResetPassword = {
  email: string;
  code: string;
  password: string;
};

export type IUpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

export type PasswordUpdate = {
  oldPassword: string;
  newPassword: string;
};

export type ApiResponse = {
  success: boolean;
  statusCode?: number;
  message: string;
};

export type SendOTP = {
  email: string;
};

export type VerifyOTP = {
  email?: string;
  code: string;
  phoneNumber?: string;
};

export type VerifyOTPResponse = ApiResponse;

export type SocialAuth = {
  thirdPartyUserId: string;
  provider: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  profileImageUrl: string;
};

export type SignUpType = {
  fullName: string;
  profilePhoto: string,
  email: string,
  country: string,
  state: string,
  city: string,
  phoneNumber: string,
  password: string
};

export type Login = {
  email: string;
  password: string;
};



export type MentorAvailableHoursType = {
  available: boolean,
  slots: {
    start: string,
    end: string
  }[]
}

export type AvailableHoursType = {
  monday: MentorAvailableHoursType,
  tuesday: MentorAvailableHoursType,
  wednesday: MentorAvailableHoursType,
  thursday: MentorAvailableHoursType,
  friday: MentorAvailableHoursType,
  saturday: MentorAvailableHoursType,
  sunday: MentorAvailableHoursType,
  _id: string
}


export type UserData = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: sring;
  profilePhoto: string;
  status: boolean;
  role: string;
  industries: string[];
  yearsOfExperience: number;
  consultationTitle: string;
  consultationFee: number;
  isSuperAdmin: boolean;
  blocked: boolean;
  suspended: boolean;
  admindeactivated: boolean;
  uniqueVerificationCode: string;
  passwordRetries: number;
  onBoardingStep: number;
  adminapproved: boolean;
  admindeclined: boolean;
  walletBalance: number;
  displayWalletBalance: boolean;
  goals: string[];
  availableHours: AvailableHoursType
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = ApiResponse & {
  data: { user: UserData } & AccessToken;
};

export type UserDataAndAccessToken = AccessToken & {
  user: UserData;
};

export type AccessToken = { token: string };

export type EncryptData = {
  userData: UserDataAndAccessToken;
  expires: Date;
};

export type UserSession = {
  userData: UserDataAndAccessToken;
  expires: Date;
  iat: number;
  exp: number;
};

export type RequestPasswordReset = {
  identifier: string;
};
