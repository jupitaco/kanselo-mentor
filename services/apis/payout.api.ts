import { Api } from "./api";
import { ApiResponse } from "@/types/auths";
import { getUser } from "../session";
import { PayoutTypeValues } from "@/schemas/payout.schemas";
import { PayoutRsp } from "@/types/payout";
import { queryBuilder } from "@/utils/helper";

export const getPayoutAccounts = async (page = "1", limit = "10") => {
  const user = await getUser();
  return Api.get<PayoutRsp>(
    `/payouts/${user?._id}?${queryBuilder({ page, limit })}`,
  );
};

export const createPayoutAccountApi = async (body: PayoutTypeValues) => {
  const user = await getUser();
  return Api.post<PayoutTypeValues, ApiResponse>(
    `/payouts/${user?._id}/account`,
    body,
    true,
  );
};

export const widthdrawalApi = async (body: { amount: number }) => {
  const user = await getUser();
  return Api.post<{ amount: number }, ApiResponse>(
    `/payouts/${user?._id}/withdraw`,
    body,
    true,
  );
};
