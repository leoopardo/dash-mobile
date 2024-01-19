import { Redirect, Slot, router } from "expo-router";
import { useSession } from "../contexts/ctx";
import { useValidate } from "../services/auth/useValidateToken";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

export function RedirectAuth() {
  const { session, signOut, signByStorage, setSession } = useSession();
  const { validateError, isValidateSuccess } = useValidate(session || "");

  const getItems = async () => {
    return await AsyncStorage.getItem("token");
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = await getItems();

      if (storedToken) {
        setSession(storedToken);

        try {
        signByStorage();
          await api.get("/core/token/validate", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          router.push("/dashboard");
        } catch (error) {
          setSession(null);
          signOut();
          router.push("/sign-in");
        }
      } else {
        setSession(null);
        signOut();
        router.push("/sign-in");
      }
    };

    fetchData();
  }, [validateError, isValidateSuccess]);

  return <Slot />;
}
