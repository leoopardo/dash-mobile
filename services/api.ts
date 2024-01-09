import Config from "react-native-config";
import axios from "react-native-axios";

export const api = axios.create({
  baseURL: "https://dev-v4.paybrokers.io/v4/",
});
