import axios from "axios";
import { QueryCache, QueryClient } from "react-query";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
let unauthorizedNotificationShown = false; // Variável para controlar se a notificação já foi exibida

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err: any) => {
      if (
        err.response.status === 401 &&
        err.request.responseURL.split("token/")[1] !== "validate" &&
        !unauthorizedNotificationShown // Verifica se a notificação já foi exibida
      ) {
        SecureStore.deleteItemAsync("token");
        queryClient.refetchQueries(["validate"]);
        Toast.show({
          type: "info",
          text1: "Sua sessão expirou",
          text2: "Por favor, faça login novamente",
        });
        unauthorizedNotificationShown = true; // Marca que a notificação foi exibida
        setTimeout(() => {
          unauthorizedNotificationShown = false;
        }, 3000);
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
});
