/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useQuery } from "react-query";
import { queryClient } from "../queryClient";
import { ValidateInterface } from "./types/validate.interface";
import { api } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
let disabledNotification = false;

export function useValidate(token?: string) {
  const { data, isFetching, error, refetch, isSuccess, remove } = useQuery<
    ValidateInterface | null | undefined
  >(
    "validate",
    async () => {
      try {
        const response = await api.get("/core/token/validate", {
          headers: {
            Authorization: `Bearer ${token ?? AsyncStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        return response.data;
       
        
      } catch (error: any) {
        console.error(error.response);
      }
    },
    {
      enabled: false
    }
  );
  useEffect(() => {
    if (isSuccess)
      api.defaults.headers.Authorization = `Bearer ${
        token ?? AsyncStorage.getItem("token")
      }`;
  }, [isSuccess]);

  if (
    [
      "AGGREGATOR DISABLED",
      "OPERATOR DISABLED",
      "MERCHANT DISABLED",
      "PARTNER DISABLED",
    ].includes((error as any)?.response?.data?.message) &&
    !disabledNotification
  ) {
    Toast.show({
      type: "error",
      text1: "Entidade desabilitada",
      text2: "Esse usuário está vinculado a uma entidade desabilitada.",
    });

    disabledNotification = true;

    AsyncStorage.removeItem("token");
    queryClient.cancelMutations();
  }
  const responseValidate = data;
  const isValidateFetching = isFetching;
  const validateError: any = error;
  const refetchValidate = refetch;
  const isValidateSuccess = isSuccess;
  return {
    responseValidate,
    isValidateFetching,
    validateError,
    refetchValidate,
    isValidateSuccess,
    remove
  };
}
