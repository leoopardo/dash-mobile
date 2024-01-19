import { useQuery } from "react-query";
import { api } from "../../../api";
import {
  MerchantBankStatementTotalsData,
  MerchantBankStatementTotalsQuery,
} from "./types/bankStatement";
import { useSession } from "../../../../contexts/ctx";
import { useEffect } from "react";

export function useGetMerchantBankStatementTotals(
  params: MerchantBankStatementTotalsQuery
) {
  const { session } = useSession();
  const { data, isFetching, error, refetch } = useQuery<
    MerchantBankStatementTotalsData | null | undefined
  >(
    "MerchantBankStatementTotals",
    async () => {
      const response = await api.get("account/report/merchant-account/total", {
        params,
        Headers: { Authorizatioin: `Bearer ${session}` },
      });
      return response.data;
    },
    {}
  );


  const MerchantBankStatementTotals = data;
  const isMerchantBankStatementTotalsFetching = isFetching;
  const MerchantBankStatementTotalsError: any = error;
  const refetchMerchantBankStatementTotalsTotal = refetch;
  return {
    MerchantBankStatementTotals,
    isMerchantBankStatementTotalsFetching,
    MerchantBankStatementTotalsError,
    refetchMerchantBankStatementTotalsTotal,
  };
}
