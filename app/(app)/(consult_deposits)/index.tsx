import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { VictoryChart, VictoryLine } from 'victory-native';

export default function ConsultGeneratedDeposits() {
  const data = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 6 },
  ];
  return (
    <View>
       <VictoryChart>
        <VictoryLine data={data} />
      </VictoryChart>
    </View>
  );
}
