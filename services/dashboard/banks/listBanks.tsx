import { useQuery } from "react-query";
import { api } from "../../api";
import { BankQuery, BankResponse } from "./types/banks.interface";
import { useSession } from "../../../contexts/ctx";

export function useListBanks(params: BankQuery) {
  const { session } = useSession();
  const { data, isFetching, error, refetch } = useQuery<
    BankResponse | null | undefined
  >("BankList", async () => {
    const response = await api.get("/config/bank_to_select", {
      params,
      Headers: { Authorizatioin: `Bearer ${session}` },
    });
    return response.data;
  });

  const bankListData = data;
  const isBankListFetching = isFetching;
  const bankListError: any = error;
  const refetchBankList = refetch;

  return {
    bankListData,
    isBankListFetching,
    bankListError,
    refetchBankList,
  };
}
