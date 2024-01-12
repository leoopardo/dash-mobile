/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "react-query";
import { api } from "../../api";
import { BankBalanceDataInterface } from "./types/banks.interface";
import { useSession } from "../../../contexts/ctx";

export function useGetOrganizationBankBalance() {
  const { session } = useSession();
  const { data, isFetching, error, refetch } = useQuery<
    BankBalanceDataInterface | null | undefined
  >("OrganizationBankBalance", async () => {
    const response = await api.get("bank/balance/values", {
      Headers: { Authorizatioin: `Bearer ${session}` },
    });

    return response.data;
  });

  const OrganizationBankBalance = data;
  const isOrganizationBankBalanceFetching = isFetching;
  const OrganizationBankBalanceError: any = error;
  const refetchOrganizationBankBalance = refetch;
  return {
    OrganizationBankBalance,
    isOrganizationBankBalanceFetching,
    OrganizationBankBalanceError,
    refetchOrganizationBankBalance,
  };
}
