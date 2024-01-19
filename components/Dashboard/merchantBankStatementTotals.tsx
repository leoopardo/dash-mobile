import { Card, Layout } from "@ui-kitten/components";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-elements";
import Colors from "../../constants/Colors";
import { MerchantBankStatementTotalsData } from "../../services/consult/merchant/bankStatement/types/bankStatement";

interface dataParams {
  loading?: boolean;
  data?: MerchantBankStatementTotalsData | null | undefined;
}

export function MerchantBankStatementTotal({ data, loading }: dataParams) {
  return (
    <Layout>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={Colors.light["color-primary-500"]}
        />
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            maxWidth: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 24,
            paddingLeft: 8,
            paddingRight: 8,
          }}
        >
          <Text
            style={{
              width: "100%",
              fontSize: 22,
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            Operações
          </Text>
          <Card style={styles.card} status="success">
            <Text style={{ fontSize: 16, marginLeft: -18, color: "#585858" }}>
              Depósitos
            </Text>
            <Divider
              style={{
                marginTop: 8,
                marginBottom: 8,
                marginLeft: -23,
                width: "140%",
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: -18, color: "#979797" }}>
              Nº operações:{" "}
              <Text style={{ fontWeight: "700" }}>{data?.number_in || 0}</Text>
            </Text>
            <Divider
              style={{
                marginTop: 8,
                marginBottom: 8,
                marginLeft: -23,
                width: "140%",
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: -18, color: "#979797" }}>
              Valor:{" "}
              <Text style={{ fontWeight: "700" }}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data?.value_in || 0)}
              </Text>
            </Text>
            <Divider
              style={{
                marginTop: 8,
                marginBottom: 8,
                marginLeft: -23,
                width: "140%",
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: -18, color: "#979797" }}>
              Ticket médio:{" "}
              <Text style={{ fontWeight: "700" }}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data?.average_ticket_in || 0)}
              </Text>
            </Text>
            <Divider
              style={{
                marginTop: 8,
                marginBottom: 8,
                marginLeft: -23,
                width: "140%",
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: -18, color: "#979797" }}>
              Taxa:{" "}
              <Text style={{ fontWeight: "700" }}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data?.fee_in || 0)}
              </Text>
            </Text>
          </Card>
          <Card style={styles.card} status="danger">
            <Text style={{ fontSize: 16, marginLeft: -18, color: "#585858" }}>
              Saques
            </Text>
            <Divider
              style={{
                marginTop: 8,
                marginBottom: 8,
                marginLeft: -23,
                width: "140%",
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: -18, color: "#979797" }}>
              Nº operações:{" "}
              <Text style={{ fontWeight: "700" }}>{data?.number_out || 0}</Text>
            </Text>
            <Divider
              style={{
                marginTop: 8,
                marginBottom: 8,
                marginLeft: -23,
                width: "140%",
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: -18, color: "#979797" }}>
              Valor:{" "}
              <Text style={{ fontWeight: "700" }}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data?.value_out || 0)}
              </Text>
            </Text>
            <Divider
              style={{
                marginTop: 8,
                marginBottom: 8,
                marginLeft: -23,
                width: "140%",
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: -18, color: "#979797" }}>
              Ticket médio:{" "}
              <Text style={{ fontWeight: "700" }}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data?.average_ticket_out || 0)}
              </Text>
            </Text>
            <Divider
              style={{
                marginTop: 8,
                marginBottom: 8,
                marginLeft: -23,
                width: "140%",
              }}
            />
            <Text style={{ fontSize: 12, marginLeft: -18, color: "#979797" }}>
              Taxa:{" "}
              <Text style={{ fontWeight: "700" }}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data?.fee_out || 0)}
              </Text>
            </Text>
          </Card>
          {/* <Text style={{ color: Colors.light["color-primary-500"] }}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(data?.fee_in || 0)}
          </Text> */}
        </View>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 2,
    width: "48%",
  },
});
