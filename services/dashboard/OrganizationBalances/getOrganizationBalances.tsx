import { useQuery } from "react-query";
import { OrganizationBalance } from "./types/organizationBalances.interface";
import { api } from "../../api";
import { useSession } from "../../../contexts/ctx";

export function useGetOrganizationBalance() {
  const { session } = useSession();
  const { data, isFetching, error, refetch } = useQuery<
    OrganizationBalance | null | undefined
  >("OrganizationBalance", async () => {
    try {
      const response = await api.get("core/organization/account/", {
        Headers: { Authorizatioin: `Bearer ${session}` },
      });

      return response.data;
    } catch (error: any) {
      console.error(error);
    }
  });

  const OrganizationBalance: OrganizationBalance | null | undefined = {
    in: data?.in ?? 0,
    pix_transactions_total: data?.pix_transactions_total ?? 0,
    pix_amount_fee: data?.pix_amount_fee ?? 0,
    out: data?.out ?? 0,
    withdraw_transactions_total: data?.withdraw_transactions_total ?? 0,
    withdraw_amount_fee: data?.withdraw_amount_fee ?? 0,
    refund_transactions_total: data?.refund_transactions_total ?? 0,
    refund_amount_fee: data?.refund_amount_fee ?? 0,
    ...data,
  };
  const isOrganizationBalanceFetching = isFetching;
  const OrganizationBalanceError: any = error;
  const refetchOrganizationBalance = refetch;
  return {
    OrganizationBalance,
    isOrganizationBalanceFetching,
    OrganizationBalanceError,
    refetchOrganizationBalance,
  };
}
