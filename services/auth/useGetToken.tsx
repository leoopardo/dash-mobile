/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { api } from "../api";
import { useValidate } from "./useValidateToken";

interface TokenInterface {
  token: string;
}

export function useToken(user: { username: string; password: string }) {
  const [data, setData] = useState<TokenInterface>({ token: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    refetchValidate,
    isValidateSuccess,
    isValidateFetching,
    responseValidate,
    validateError,
  } = useValidate(data.token);

  async function Login() {
    try {
      setIsLoading(true);
      const response = await api.post(
        "/core/token",
        {},
        {
          auth: { username: user.username, password: user.password },
          headers: { Authorization: "" },
        }
      );
      await AsyncStorage.removeItem("token");
      await AsyncStorage.setItem("token", response.data.token);
      setData(response.data);
    } catch (error: any) {
      setError(error);
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (data.token) {
      setIsSuccess(true);
      refetchValidate();
    }
  }, [data]);

  const LoginError: any = error;
  return {
    isValidateSuccess,
    isValidateFetching,
    responseValidate,
    validateError,
    data,
    error,
    isLoading,
    Login,
  };
}
