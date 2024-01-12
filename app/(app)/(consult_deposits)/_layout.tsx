import { Tabs } from "expo-router";
import useHeader from "../../../components/header";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";

export default function ConsultDepositsLayout() {
  function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
    size?: number;
  }) {
    return (
      <FontAwesome
        size={props.size ?? 24}
        style={{ marginBottom: -3, color: Colors.light["color-primary-500"] }}
        {...props}
      />
    );
  }
  return (
    <Tabs
    screenOptions={{
      tabBarLabelStyle: { color: Colors.light["color-primary-500"]},
      tabBarActiveBackgroundColor: Colors.light["color-primary-200"],
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Gerados",
          tabBarIcon: ({ color }) => <TabBarIcon name="dollar" color={color} />,
        }}
        
      />
      <Tabs.Screen
        name="paid"
        options={{
          headerShown: false,
          title: "Pagos",
          tabBarIcon: ({ color }) => <TabBarIcon name="check" color={color} />,
        }}
      />{" "}
      <Tabs.Screen
        name="undelivered"
        options={{
          headerShown: false,
          title: "Não entregues",
          tabBarIcon: ({ color }) => <TabBarIcon name="remove" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          headerShown: false,
          title: "Relatórios",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="file" color={color} size={20} />
          ),
        }}
      />
    </Tabs>
  );
}
