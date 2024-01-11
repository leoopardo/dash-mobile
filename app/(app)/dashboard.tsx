import { Text, View } from "react-native";
import { useSession } from "../../contexts/ctx";

export default function Dashboard() {
  const { user } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {<Text>Bem vindo, {user && user?.name}</Text>}
    </View>
  );
}
