export type TransactionType = {
  id: string;
  date: string;
  time: string;
  type: string;
  status: string;
  amount: number;
};

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
    page: 1;
    limit: 10;
    total: 3;
    totalPages: 1;
    withdrawals: PayoutWithdrawalType[];
  };
};
