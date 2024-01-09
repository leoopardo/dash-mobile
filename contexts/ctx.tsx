import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useStorageState } from "./useStorageState";
import { useToken } from "../services/auth/useGetToken";

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  setCredentials: Dispatch<
    SetStateAction<{ username: string; password: string }>
  >;
  session?: string | null;
  isLoading: boolean;
  success?: boolean;
  error?: any;
}>({
  signIn: () => null,
  signOut: () => null,
  setCredentials: () => null,
  session: null,
  isLoading: false,
  success: false,
  error: null,
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
  const { Login, data, error, isValidateSuccess, isLoading } = useToken({
    username: credentials.username,
    password: credentials.password,
  });

  useEffect(() => {
    setSession(data.token);
  }, [data]);

  console.log(credentials);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          Login();
        },
        setCredentials,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        success: isValidateSuccess,
        error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
