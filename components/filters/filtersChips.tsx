import { Dispatch, SetStateAction } from "react";
import { Chip } from "@rneui/themed";
import { View } from "react-native";
import Colors from "../../constants/Colors";
import { useTranslation } from "react-i18next";

interface FilterChipsProps {
  query: any;
  setQuery: Dispatch<SetStateAction<any>>;
  initialDate: boolean;
  startDateKeyName: string;
  endDateKeyName: string;
}

export function FilterChips({
  initialDate,
  query,
  setQuery,
  startDateKeyName,
  endDateKeyName,
}: FilterChipsProps) {
  const { t } = useTranslation();

  console.log(query);
  
  return (
    <View
      style={{
        width: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        paddingBottom: 8,
        paddingTop: 8,
      }}
    >
      {Object.keys(query).map((key) => {
        switch (key) {
          case startDateKeyName:
            return (
              <Chip
                title={`${t("chips.date")}: ${new Date(
                  query[key]
                ).toLocaleDateString()} ${new Date(
                  query[key]
                ).toLocaleTimeString()} -  ${new Date(
                  query[endDateKeyName]
                ).toLocaleDateString()} ${new Date(
                  query[endDateKeyName]
                ).toLocaleTimeString()}`}
                icon={{
                  name: "close",
                  type: "font-awesome",
                  size: 20,
                  color: Colors.light["color-primary-100"],
                }}
                onPress={() => {
                  const newQuery = { ...query };
                  delete newQuery[key];
                  delete newQuery[endDateKeyName];
                  setQuery(newQuery);
                }}
                iconRight
                type="solid"
                containerStyle={{
                  marginVertical: 8,
                  marginHorizontal: 8,
                }}
                titleStyle={{ color: Colors.light["color-primary-100"] }}
                color={Colors.light["color-primary-500"]}
              />
            );
          case endDateKeyName:
            return;

          default:
            return (
              <Chip
                title={`${t(`chips.${key}`)}: ${t(`chips.${query[key]}`)}`}
                icon={{
                  name: "close",
                  type: "font-awesome",
                  size: 20,
                  color: Colors.light["color-primary-200"],
                }}
                onPress={() => {
                  const newQuery = { ...query };
                  delete newQuery[key];
                  setQuery(newQuery);
                }}
                iconRight
                type="solid"
                containerStyle={{
                  marginHorizontal: 8,
                }}
                titleStyle={{ color: Colors.light["color-primary-100"] }}
                color={Colors.light["color-primary-500"]}
              />
            );
        }
      })}
    </View>
  );
}
