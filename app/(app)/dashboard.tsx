import { Text, View } from "react-native";
import { useSession } from "../../contexts/ctx";
import { useGetOrganizationBalance } from "../../services/dashboard/OrganizationBalances/getOrganizationBalances";
import OrganizationBalanceStats from "../../components/Dashboard/OrganizationBalances";
import { Tab, TabView } from "@ui-kitten/components";
import { useState } from "react";
import MerchantBalanceStats from "../../components/Dashboard/MerchantBalances";

export default function Dashboard() {
  const { user } = useSession();
  const { OrganizationBalance } = useGetOrganizationBalance();

  const [selectedIndex, setSelectedIndex] = useState<any>(0);
  console.log(OrganizationBalance);

  return (
    <View style={{}}>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title="Saldo organização">
          <OrganizationBalanceStats />
        </Tab>
        <Tab title="Saldo empresa">
          <MerchantBalanceStats />
        </Tab>
      </TabView>
    </View>
  );
}
