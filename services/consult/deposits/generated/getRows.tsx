import { useQuery } from "react-query";
import { api } from "../../../api";
import {
  generatedDepositRowsResponse,
  generatedDepositTotalQuery,
} from "./types/generatedDeposits.interface";
import { useSession } from "../../../../contexts/ctx";

export function useGetRowsGeneratedDeposits(
  params: generatedDepositTotalQuery
) {
  const { session } = useSession();
  const { data, isFetching, error, refetch } = useQuery<
    generatedDepositRowsResponse | null | undefined
  >(
    "depositsRows",
    async () => {
      const response = await api.get("report/pix/rows", {
        params,
        Headers: { Authorizatioin: `Bearer ${session}` },
      });
      return response.data;
    },
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const depositsRows = data;
  const isDepositsRowsFetching = isFetching;
  const depositsRowsError: any = error;
  const refetchDepositsTotalRows = refetch;
  return {
    depositsRows,
    isDepositsRowsFetching,
    depositsRowsError,
    refetchDepositsTotalRows,
  };
}
