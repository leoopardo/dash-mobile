import { Button, List, ListItem, Tab, TabView } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Divider } from "react-native-elements";
import MerchantBalanceStats from "../../components/Dashboard/MerchantBalances";
import OrganizationBalanceStats from "../../components/Dashboard/OrganizationBalances";
import Colors from "../../constants/Colors";
import { useSession } from "../../contexts/ctx";
import { useGetOrganizationBankBalance } from "../../services/dashboard/banks/getOrganizationBankBalance";
import { useListBanks } from "../../services/dashboard/banks/listBanks";
import { useFilter } from "../../contexts/filtersContext";
import Filters from "../../components/filters/filters";
import { FilterChips } from "../../components/filters/filtersChips";

export default function Dashboard({ initial_params }: { initial_params: any }) {
  const { user } = useSession();
  const { bankListData } = useListBanks({ limit: 10, page: 1 });
  const { OrganizationBankBalance } = useGetOrganizationBankBalance();
  const [selectedIndex, setSelectedIndex] = useState<any>(0);
  const { open, setOpen } = useFilter();
  const [query, setQuery] = useState<any>({});
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
      <FilterChips
        initialDate={false}
        query={query}
        setQuery={setQuery}
        startDateKeyName="start_date"
        endDateKeyName="end_date"
      />
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
            style={{ borderBottomWidth: 1, borderBottomColor: "#e4e4e4" }}
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
              <Text style={{ marginTop: -40, fontSize: 12 }}>
                {`${new Date(
                  OrganizationBankBalance?.banks.find(
                    (bank) => bank.name === item.bank
                  )?.date_checked || ""
                ).toLocaleDateString("pt-BR")} ${new Date(
                  OrganizationBankBalance?.banks.find(
                    (bank) => bank.name === item.bank
                  )?.date_checked || ""
                )
                  .toLocaleTimeString("pt-BR")
                  .split(":")
                  .splice(0, 2)
                  .join(":")}`}
              </Text>
            )}
          />
        )}
      />

      <Filters
        open={open}
        setOpen={setOpen}
        filters={[
          { value: "start_date", label: "Data" },
          { value: "end_date", label: "Data" },
          { value: "status", label: "Situação" },
        ]}
        selectOptions={{
          status: [
            { value: true, label: "Ativo" },
            { value: false, label: "Inativo" },
          ],
        }}
        query={query}
        setQuery={setQuery}
        startDateKeyName="start_date"
        endDateKeyName="end_date"
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
