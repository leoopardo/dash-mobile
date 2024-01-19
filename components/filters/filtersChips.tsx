import { Dispatch, SetStateAction } from "react";
import { Chip } from "@rneui/themed";
import { View } from "react-native";
import Colors from "../../constants/Colors";
import { useTranslation } from "react-i18next";
import moment from "moment";

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
  const { t, i18n } = useTranslation();

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {Object.keys(query).map((key) => {
        switch (key) {
          case startDateKeyName:
            return (
              <View>
              <Chip
              size="sm"
                title={`${t("chips.date")}: ${moment(query[key])
                  .subtract(3, "hours")
                  .format(
                    i18n.language === "pt-BR"
                      ? "DD/MM/YYYY HH:mm"
                      : "YYYY/MM/DD HH:mm"
                  )} - ${moment(query[endDateKeyName])
                  .subtract(3, "hours")
                  .format(
                    i18n.language === "pt-BR"
                      ? "DD/MM/YYYY HH:mm"
                      : "YYYY/MM/DD HH:mm"
                  )} `}
                icon={{
                  name: "close",
                  type: "font-awesome",
                  size: 16,
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
                  marginTop: 8,
                  marginRight: 8,
                }}
                titleStyle={{ color: Colors.light["color-primary-100"], fontSize: 12 }}
                color={Colors.light["color-primary-500"]}
              />
              </View>
            );
          case endDateKeyName:
            return;

          default:
            return (
              <View>
              <Chip
              size="sm"
                title={`${t(`chips.${key}`)}: ${t(`chips.${query[key]}`)}`}
                icon={{
                  name: "close",
                  type: "font-awesome",
                  size: 16,
                  color: Colors.light["color-primary-100"],
                }}
                onPress={() => {
                  const newQuery = { ...query };
                  delete newQuery[key];
                  setQuery(newQuery);
                }}
                iconRight
                type="solid"
                containerStyle={{
                  marginTop: 8,
                  marginRight: 8,
                }}
                titleStyle={{ color: Colors.light["color-primary-100"], fontSize: 12 }}
                color={Colors.light["color-primary-500"]}
              />
              </View>
            );
        }
      })}
    </View>
  );
}
