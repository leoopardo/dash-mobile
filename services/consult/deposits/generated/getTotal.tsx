import { useEffect, useState } from "react";
import { api } from "../../../api";
import {
  generatedDepositTotal,
  generatedDepositTotalQuery,
} from "./types/generatedDeposits.interface";
import { useSession } from "../../../../contexts/ctx";

export function useGetTotalGeneratedDeposits(
  params: generatedDepositTotalQuery
) {
  const { session } = useSession();
  const [data, setData] = useState<generatedDepositTotal | null>(null);
  const [error, setError] = useState<any>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchTotalDeposits = async () => {
    try {
      setIsFetching(true);
      const response = await api.get("report/pix/total", {
        params,
        Headers: { Authorizatioin: `Bearer ${session}` },
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchTotalDeposits();
  }, [params]);

  const depositsTotal = data;
  const isDepositsTotalFetching = isFetching;
  const depositsTotalError: any = error;
  const refetchDepositsTotal = fetchTotalDeposits;

  return {
    depositsTotal,
    isDepositsTotalFetching,
    depositsTotalError,
    refetchDepositsTotal,
  };
}
