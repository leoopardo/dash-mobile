import { View } from "react-native";
import { useGetOrganizationBalance } from "../../services/dashboard/OrganizationBalances/getOrganizationBalances";

export default function OrganizationBalance() {
  const { OrganizationBalance, isOrganizationBalanceFetching } = useGetOrganizationBalance();

  return <View>{!isOrganizationBalanceFetching && OrganizationBalance._id}</View>;
}
