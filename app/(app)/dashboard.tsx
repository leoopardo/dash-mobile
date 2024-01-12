import { List, ListItem, Tab, TabView } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import MerchantBalanceStats from "../../components/Dashboard/MerchantBalances";
import OrganizationBalanceStats from "../../components/Dashboard/OrganizationBalances";
import Colors from "../../constants/Colors";
import { useSession } from "../../contexts/ctx";
import { useGetOrganizationBankBalance } from "../../services/dashboard/banks/getOrganizationBankBalance";
import { useListBanks } from "../../services/dashboard/banks/listBanks";

export default function Dashboard() {
  const { user } = useSession();
  const { bankListData } = useListBanks({ limit: 10, page: 1 });
  const { OrganizationBankBalance } = useGetOrganizationBankBalance();
  const [selectedIndex, setSelectedIndex] = useState<any>(0);

  console.log(bankListData?.itens.filter((item) => item.status));

  return (
    <View style={{ overflow: "scroll" }}>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        tabBarStyle={{ height: 45 }}
      >
        <Tab title="Saldo organização">
          <OrganizationBalanceStats />
        </Tab>
        <Tab title="Saldo empresa">
          <MerchantBalanceStats />
        </Tab>
      </TabView>
      <List
        data={bankListData?.itens.filter(
          (item) =>
            item.status &&
            OrganizationBankBalance?.banks.find(
              (bank) => bank.name === item.bank
            )
        )}
        renderItem={({ item }) => (
          <ListItem
            title={`${item.label_name}`}
            description={() => (
              <View>
                <Text style={styles.bankBalance}>
                  Saldo: {""}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    OrganizationBankBalance?.banks.find(
                      (bank) => bank.name === item.bank
                    )?.value || 0
                  )}
                </Text>

                <Text style={styles.bankBalanceBlocked}>
                  Bloqueado: {""}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    OrganizationBankBalance?.banks.find(
                      (bank) => bank.name === item.bank
                    )?.value || 0
                  )}
                </Text>
              </View>
            )}
            accessoryLeft={() => (
              <Avatar source={item.icon_url ? { uri: item.icon_url } : {}} />
            )}
            accessoryRight={() => (
              <Text>
                {/* {new Date(
                  OrganizationBankBalance?.banks.find(
                    (bank) => bank.name === item.bank
                  )?.date_checked
                ).toLocaleDateString("pt-BR")} */}
              </Text>
            )}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bankBalance: {
    marginLeft: 8,
    color: "#7e7e7e",
  },
  bankBalanceBlocked: {
    marginLeft: 8,
    color: Colors.light["color-danger-600"],
  },
});
