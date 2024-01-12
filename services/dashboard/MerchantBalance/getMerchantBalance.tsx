/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { api } from "../../api";
import { useSession } from "../../../contexts/ctx";
import {
  MerchantBalanceQuery,
  MerchantBalanceTotalsData,
} from "./types/merchantBalances.interface";

export function useGetMerchantBalanceTotal(params: MerchantBalanceQuery) {
  const { session } = useSession();
  const { data, isFetching, error, refetch } = useQuery<
    MerchantBalanceTotalsData | null | undefined
  >(
    "MerchantBalanceTotals",
    async () => {
      const response = await api.get("core/merchant/account/totals", {
        params,
        Headers: { Authorizatioin: `Bearer ${session}` },
      });
      return response?.data;
    },
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const MerchantBalance = error ? ({} as any) : data;
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
