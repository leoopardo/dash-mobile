import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useGetOrganizationBalance } from "../../services/dashboard/OrganizationBalances/getOrganizationBalances";
import { Card, Layout } from "@ui-kitten/components";
import Colors from "../../constants/Colors";

export default function OrganizationBalanceStats() {
  const { OrganizationBalance, isOrganizationBalanceFetching } =
    useGetOrganizationBalance();

  return (
    <Layout style={styles.container}>
      {isOrganizationBalanceFetching ? (
        <ActivityIndicator
          size="small"
          color={Colors.light["color-primary-500"]}
          style={{ marginTop: 20 }}
        />
      ) : (
        <>
          <Card style={styles.card} status="info">
            <Text style={styles.label}>Saldo transação</Text>
            <Text>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(OrganizationBalance.balance_to_transactions || 0)}
            </Text>
          </Card>

          <Card style={styles.card} status="danger">
            <Text style={styles.label}>Saldo Pagamento</Text>
            <Text>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(OrganizationBalance.balance_to_payment || 0)}
            </Text>
          </Card>

          <Card style={styles.card} status="warning">
            <Text style={styles.label}>Saldo reservado</Text>
            <Text>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(OrganizationBalance.balance_reserved || 0)}
            </Text>
          </Card>

          <Card style={styles.card} status="primary">
            <Text style={styles.label}>Total</Text>
            <Text>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(OrganizationBalance.balance_total || 0)}
            </Text>
          </Card>
        </>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    width: "100%",
    height: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 2,
    width: "48%",
  },
  label: {
    color: "#999999",
  },
});
