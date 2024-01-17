import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useToken } from "../services/auth/useGetToken";
import { useValidate } from "../services/auth/useValidateToken";
import { useStorageState } from "./useStorageState";
import { ValidateInterface } from "../services/auth/types/validate.interface";
import { queryClient } from "../services/queryClient";

const AuthContext = React.createContext<{
  signIn: () => void;
  signByStorage: () => void;
  signOut: () => void;
  setSession: (value: string | null) => void;
  setCredentials: Dispatch<
    SetStateAction<{ username: string; password: string }>
  >;
  session?: string | null;
  isLoading: boolean;
  success?: boolean;
  error?: any;
  user?: ValidateInterface;
}>({
  signIn: () => null,
  signOut: () => null,
  setSession: () => null,
  setCredentials: () => null,
  signByStorage: () => null,
  session: null,
  isLoading: false,
  success: false,
  error: null,
  user: undefined,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[_load, session], setSession] = useStorageState("token");
  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const [asyncStorage, setAsyncStorage] = useState<string>("");
  const { Login, data, error, isLoading } = useToken({
    username: credentials.username,
    password: credentials.password,
  });

  const {
    refetchValidate,
    isValidateSuccess,
    isValidateFetching,
    responseValidate,
    remove,
    validateError,
  } = useValidate(session || data?.token);

  useEffect(() => {
    setSession(data.token);
  }, [data]);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          Login();
        },
        setCredentials,
        signOut: () => {
          setSession(null);
          AsyncStorage.removeItem("token");
          remove();
        },
        signByStorage: async () => {
          const tokenStorage = await AsyncStorage.getItem("token");
          setSession(tokenStorage || session); // Update asyncStorage state
          if (!validateError) {
            refetchValidate();
          }
        },
        setSession,
        session,
        isLoading: isLoading || isValidateFetching || _load,
        success: isValidateSuccess,
        error,
        user: responseValidate ?? undefined,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
