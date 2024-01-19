import {
  Divider,
  Layout,
  List,
  ListItem,
  Tab,
  TabView,
} from "@ui-kitten/components";
import moment from "moment";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import MerchantBalanceStats from "../../components/Dashboard/MerchantBalances";
import OrganizationBalanceStats from "../../components/Dashboard/OrganizationBalances";
import { MerchantBankStatementTotal } from "../../components/Dashboard/merchantBankStatementTotals";
import Filters from "../../components/filters/filters";
import { FilterChips } from "../../components/filters/filtersChips";
import Colors from "../../constants/Colors";
import { useSession } from "../../contexts/ctx";
import { useFilter } from "../../contexts/filtersContext";
import { useGetOrganizationBankBalance } from "../../services/dashboard/banks/getOrganizationBankBalance";
import { useListBanks } from "../../services/dashboard/banks/listBanks";
import { useGetMerchantBankStatementTotals } from "../../services/consult/merchant/bankStatement/getTotals";
import { useGetMerchantsBalance } from "../../services/dashboard/MerchantBalance/getMerchantsBalance";
import { queryClient } from "../../services/queryClient";

const INITIAL_QUERY = {
  start_date: moment(new Date())
    .startOf("day")
    .add(3, "hours")
    .format("YYYY-MM-DDTHH:mm:ss.SSS"),
  end_date: moment(new Date())
    .add(1, "day")
    .startOf("day")
    .add(3, "hours")
    .format("YYYY-MM-DDTHH:mm:ss.SSS"),
};

export default function Dashboard({ initial_params }: { initial_params: any }) {
  const { user } = useSession();
  const permissions = user?.permissions;
  const { bankListData } = useListBanks({ limit: 10, page: 1 });
  const { OrganizationBankBalance } = useGetOrganizationBankBalance();
  const [selectedIndex, setSelectedIndex] = useState<any>(0);
  const { open, setOpen } = useFilter();
  const [query, setQuery] = useState<any>(INITIAL_QUERY);
  const { MerchantBankStatementTotals, isMerchantBankStatementTotalsFetching } =
    useGetMerchantBankStatementTotals(query);
  const { MerchantBalance, isMerchantBalanceFetching } = useGetMerchantsBalance(
    { ...query, limit: 10 }
  );
 
  useEffect(() => {
   setTimeout(() => { queryClient.invalidateQueries();}, 1000) 
     

  }, []);

  return (
    <ScrollView>
      <Layout>
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
        <View>
          <List
            data={bankListData?.itens.filter(
              (item) =>
                item.status &&
                OrganizationBankBalance?.banks.find(
                  (bank) => bank.name === item.bank
                )
            )}
            ItemSeparatorComponent={Divider}
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
                  <Avatar
                    source={item.icon_url ? { uri: item.icon_url } : {}}
                  />
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
        </View>

        <MerchantBankStatementTotal
          data={MerchantBankStatementTotals}
          loading={isMerchantBankStatementTotalsFetching}
        />

        {isMerchantBalanceFetching ? (
          <Text>Carregando...</Text>
        ) : (
          <View>
            <Text
              style={{
                width: "100%",
                fontSize: 22,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Saldos por empresa
            </Text>
            <List
              data={MerchantBalance?.items}
              ItemSeparatorComponent={Divider}
              numColumns={2}
              horizontal={false}
              style={{ borderTopColor: "#ebebeb", borderTopWidth: 1 }}
              renderItem={({ item, index }) => (
                <ListItem
                  title={`${index + 1} - ${item.merchant_name}`}
                  style={{
                    width: "50%",
                    borderRightWidth: index % 2 === 0 ? 1 : 0,
                    borderRightColor: "#ebebeb",
                  }}
                  description={() => (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      <Text
                        style={{
                          color: "#a1a1a1",
                          fontSize: 14,
                          marginLeft: 8,
                        }}
                      >
                        Transação:{" "}
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item?.balance_to_transactions || 0)}{" "}
                      </Text>
                      <Text
                        style={{
                          color: "#a1a1a1",
                          fontSize: 14,
                          marginLeft: 8,
                        }}
                      >
                        Pagamento:{" "}
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item?.balance_to_payment || 0)}{" "}
                      </Text>
                      <Text
                        style={{
                          color: "#a1a1a1",
                          fontSize: 14,
                          marginLeft: 8,
                        }}
                      >
                        Reservado:{" "}
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item?.balance_reserved || 0)}
                      </Text>
                    </View>
                  )}
                />
              )}
            />
          </View>
        )}
        <Filters
          open={open}
          setOpen={setOpen}
          filters={[
            { value: "start_date", label: "Data" },
            { value: "end_date", label: "Data" },
          ]}
          selectOptions={{}}
          query={query}
          setQuery={setQuery}
          startDateKeyName="start_date"
          endDateKeyName="end_date"
        />
      </Layout>
    </ScrollView>
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
