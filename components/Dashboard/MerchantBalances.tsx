import { Card, Layout } from "@ui-kitten/components";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";
import { useGetMerchantBalanceTotal } from "../../services/dashboard/MerchantBalance/getMerchantBalance";

export default function MerchantBalanceStats() {
  const {MerchantBalance, isMerchantBalanceFetching} = useGetMerchantBalanceTotal({limit: 25, page: 1})

  return (
    <Layout style={styles.container}>
      {isMerchantBalanceFetching ? (
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
              }).format(MerchantBalance.balance_to_transactions || 0)}
            </Text>
          </Card>

          <Card style={styles.card} status="danger">
            <Text style={styles.label}>Saldo Pagamento</Text>
            <Text>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(MerchantBalance.balance_to_payment || 0)}
            </Text>
          </Card>

          <Card style={styles.card} status="warning">
            <Text style={styles.label}>Saldo reservado</Text>
            <Text>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(MerchantBalance.balance_reserved || 0)}
            </Text>
          </Card>

          <Card style={styles.card} status="primary">
            <Text style={styles.label}>Total</Text>
            <Text>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(MerchantBalance.balance_total || 0)}
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
    padding: 8
  },
  card: {
    margin: 2,
    width: "48%",
  },
  label: {
    color: "#999999",
  },
});
