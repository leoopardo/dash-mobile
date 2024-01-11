import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { QueryCache, QueryClient } from "react-query";
let unauthorizedNotificationShown = false; // Variável para controlar se a notificação já foi exibida

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    
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
