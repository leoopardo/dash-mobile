import moment from "moment";
import { useState } from "react";
import { View } from "react-native";
import { VictoryTooltip, VictoryPie } from "victory-native";
import Filters from "../../../components/filters/filters";
import Colors from "../../../constants/Colors";
import { useFilter } from "../../../contexts/filtersContext";
import { useGetTotalGeneratedDeposits } from "../../../services/consult/deposits/generated/getTotal";
import { generatedDepositTotalQuery } from "../../../services/consult/deposits/generated/types/generatedDeposits.interface";
import { Divider, List, ListItem } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

const INITIAL_QUERY = {
  initial_date: moment(new Date())
    .startOf("day")
    .add(3, "hours")
    .format("YYYY-MM-DDTHH:mm:ss.SSS"),
  final_date: moment(new Date())
    .add(1, "day")
    .startOf("day")
    .add(3, "hours")
    .format("YYYY-MM-DDTHH:mm:ss.SSS"),
};

export default function ConsultGeneratedDeposits() {
  const { t } = useTranslation();
  const [query, setQuery] = useState<generatedDepositTotalQuery>(INITIAL_QUERY);
  const { depositsTotal, isDepositsTotalFetching } =
    useGetTotalGeneratedDeposits(query);
  const [selected, setSelected] = useState<
    | "awaiting_refund_total"
    | "canceled_total"
    | "expired_total"
    | "paid_total"
    | "refund_total"
    | null
    | any
  >(null);
  const { open, setOpen } = useFilter();
  const data =
    depositsTotal &&
    Object.keys(depositsTotal)
      .filter((key) =>
        [
          "awaiting_refund_total",
          "canceled_total",
          "expired_total",
          "paid_total",
          "refund_total",
        ].includes(key)
      )
      .map((key) => {
        return { x: key, y: (depositsTotal as any)[key], label: key };
      });

  // const data = [
  //   {
  //     label: depositsTotal?.paid_total ? "1" : " ",
  //     x: depositsTotal?.paid_total ? 3 : " ",
  //     y: depositsTotal?.paid_total,
  //   },
  //   {
  //     label: depositsTotal?.refund_total ? "2" : " ",
  //     x: depositsTotal?.refund_total ? 4 : " ",
  //     y: depositsTotal?.refund_total,
  //   },
  //   {
  //     label: depositsTotal?.awaiting_refund_total ? "awaiting_refund_total" : " ",
  //     x: depositsTotal?.expired_total ? 0 : " ",
  //     y: depositsTotal?.awaiting_refund_total,
  //   },
  //   {
  //     label: depositsTotal?.canceled_total ? "4" : " ",
  //     x: depositsTotal?.canceled_total ? 1 : " ",
  //     y: depositsTotal?.canceled_total,
  //   },
  //   {
  //     label: depositsTotal?.expired_total ? "5" : " ",
  //     x: depositsTotal?.expired_total ? 2 : " ",
  //     y: depositsTotal?.expired_total,
  //   },
  // ];
  function handleCardOnPress(id: string) {
    setSelected((prev: any) => (prev === id ? null : id));
  }

  return (
    <View>
      {depositsTotal && (
        <VictoryPie
          style={{
            labels: {
              fill: "white",
              fontSize: 16,
            },
            data: {
              stroke: ({ datum }) =>
                datum.x === selected ? "#00000055" : "none",
              strokeWidth: 10,
              strokeOpacity: 0.5,
              fillOpacity: ({ datum }) =>
                datum.x === selected || selected === null ? 1 : 0.5,
            },
          }}
          padAngle={() => 2}
          colorScale={[
            Colors.light["color-primary-400"],
            Colors.light["color-primary-600"],
            Colors.light["color-warning-500"],
            Colors.light["color-danger-500"],
            Colors.light["color-danger-600"],
          ]}
          data={data || []}
          events={[
            {
              target: "data",
              eventHandlers: {
                onPressIn: (_, props) => {
                  handleCardOnPress(props.datum.x);
                  return { style: { fill: Colors.light["color-primary-500"] } };
                },
                onPressOut: () => {
                  return { style: { fill: Colors.light["color-primary-500"] } };
                },
              },
            },
          ]}
          innerRadius={100}
          animate={{ duration: 2000, easing: "circleInOut" }}
          labels={({ datum }) =>
            selected === datum.x
              ? `${datum.x}\n${datum.y}`
              : selected === null
              ? datum.y
              : null
          }
          labelComponent={
            <VictoryTooltip
              constrainToVisibleArea
              flyoutStyle={{ fill: "white" }}
              style={{ fill: "black" }}
            />
          }
        />
      )}
      <List
        data={[
          {
            name: "paid_total",
            total: depositsTotal?.paid_total,
            value: depositsTotal?.paid_value,
            color: Colors.light["color-primary-400"],
          },
          {
            name: "refund_total",
            total: depositsTotal?.refund_total,
            value: depositsTotal?.refund_value,
            color: Colors.light["color-primary-600"],
          },
          {
            name: "awaiting_refund_total",
            total: depositsTotal?.awaiting_refund_total,
            value: depositsTotal?.awaiting_refund_value,
            color: Colors.light["color-warning-500"],
          },
          {
            name: "canceled_total",
            total: depositsTotal?.canceled_total,
            value: depositsTotal?.canceled_value,
            color: Colors.light["color-danger-500"],
          },
          {
            name: "expired_total",
            total: depositsTotal?.expired_total,
            value: depositsTotal?.expired_value,
            color: Colors.light["color-danger-600"],
          },
        ]}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <ListItem
            style={{ borderLeftWidth: 5, borderLeftColor: item.color }}
            title={t(`card.${item.name}`)}
            description={() => <View></View>}
          />
        )}
      />
      <Filters
        open={open}
        setOpen={setOpen}
        filters={[
          { value: "initial_date", label: "Data" },
          { value: "final_date", label: "Data" },
        ]}
        selectOptions={{}}
        query={query}
        setQuery={setQuery}
        startDateKeyName="initial_date"
        endDateKeyName="final_date"
      />
    </View>
  );
}
