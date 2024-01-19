/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import {
  MerchantBalanceData,
  MerchantBalanceQuery,
} from "./types/merchantBalances.interface";
import { api } from "../../api";
import { useSession } from "../../../contexts/ctx";

export function useGetMerchantsBalance(params: MerchantBalanceQuery) {
  const { session } = useSession();
  const { data, isFetching, error, refetch } = useQuery<
    MerchantBalanceData | null | undefined
  >("MerchantBalance", async () => {
    const response = await api.get("core/merchant/account", {
      params,
      Headers: { Authorizatioin: `Bearer ${session}` },
    });
    return response?.data;
  });

  const MerchantBalance = data;
  const isMerchantBalanceFetching = isFetching;
  const MerchantBalanceError: any = error;
  const refetchMerchantBalance = refetch;
  return {
    MerchantBalance,
    isMerchantBalanceFetching,
    MerchantBalanceError,
    refetchMerchantBalance,
  };
}
