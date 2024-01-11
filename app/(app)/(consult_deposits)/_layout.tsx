import { Tabs } from "expo-router";
import useHeader from "../../../components/header";

export default function ConsultDepositsLayout() {
  const header = useHeader();
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
