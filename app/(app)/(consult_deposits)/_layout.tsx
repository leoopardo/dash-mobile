import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Colors from "../../../constants/Colors";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  size?: number;
  active?: boolean;
}) {
  return (
    <FontAwesome
      size={props.size ?? 24}
      style={{
        marginBottom: -3,
        color: props.active ? Colors.light["color-primary-500"] : "#9b9b9b",
      }}
      {...props}
    />
  );
}
const CustomBottomTabBar = ({ navigation, state }: any) => {
  console.log(state, navigation);
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab
        title="Gerados"
        icon={() => (
          <TabBarIcon name="dollar" size={16} active={state.index === 0} />
        )}
      />
      <BottomNavigationTab
        title="Pagos"
        icon={() => (
          <TabBarIcon name="check" size={16} active={state.index === 1} />
        )}
      />
      <BottomNavigationTab
        title="Não entregues"
        icon={() => (
          <TabBarIcon name="remove" size={16} active={state.index === 2} />
        )}
      />
      <BottomNavigationTab
        title="Relatórios"
        icon={() => (
          <TabBarIcon name="file" size={16} active={state.index === 3} />
        )}
      />
    </BottomNavigation>
  );
};

// Main component using expo-router Tabs
export default function ConsultDepositsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      screenOptions={{
        tabBarLabelStyle: { color: Colors.light["color-primary-500"] },
        tabBarActiveBackgroundColor: Colors.light["color-primary-200"],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Gerados",
        }}
      />
      <Tabs.Screen
        name="paid"
        options={{
          headerShown: false,
          title: "Pagos",
        }}
      />
      <Tabs.Screen
        name="undelivered"
        options={{
          headerShown: false,
          title: "Não entregues",
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          headerShown: false,
          title: "Relatórios",
        }}
      />
    </Tabs>
  );
}
