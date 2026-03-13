export type PayoutWithdrawalType = {
  _id: string;
  userId: string;
  amount: number;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type PayoutType = {
  accountNumber: string;
  accountName: string;
  bankName: string;
};

export type PayoutRsp = ApiResponse & {
  data: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    withdrawals: PayoutWithdrawalType[];
  };
};

export type TransactionType = {
  _id: string;
  userId: UserData;
  type: string;
  category: string;
  amount: number;
  description: string;
  relatedUserId: UserData;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type TransactionRsp = ApiResponse & {
  data: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    transactions: TransactionType[];
  };
};
