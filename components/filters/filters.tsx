import {
  Button,
  Card,
  Divider,
  Input,
  Modal,
  RangeDatepicker,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon as EvaIcon } from "react-native-eva-icons";
import moment from "moment";

interface FiltersProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  query: any;
  setQuery: Dispatch<SetStateAction<any>>;
  filters: { value: string; label: string }[];
  selectOptions: any;
  startDateKeyName: string;
  endDateKeyName: string;
  initialQuery?: any;
}

export default function Filters({
  open,
  setOpen,
  query,
  setQuery,
  filters,
  selectOptions,
  endDateKeyName,
  startDateKeyName,
  initialQuery,
}: FiltersProps) {
  const [filtersQuery, setFiltersQuery] = useState<any>(query);
  const [selectsIndex, setSelectsIndex] = useState<any>({});
  const [range, setRange] = useState<{ startDate?: any; endDate?: any }>({});
  // const [date, setDate] = useState<any>(new Date());
  // const [time, setTime] = useState<any>({ start: "", end: "" });
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    Object.keys(query).forEach((key) => {
      if (!query[key]) {
        const newIndex = { ...selectsIndex };
        delete newIndex[key];
        setSelectsIndex(newIndex);
        return;
      }
      if (selectOptions[key]) {
        setSelectsIndex((state: any) => ({
          ...state,
          [key]: selectOptions[key].findIndex(
            (item: any) => item.value === query[key]
          ),
        }));
      } else {
        setFiltersQuery((state: any) => ({ ...state, [key]: query[key] }));
      }
    });
    if (query[startDateKeyName] && query[endDateKeyName]) {
      setRange({
        endDate: query[endDateKeyName],
        startDate: query[startDateKeyName],
      });
    } else {
      setRange({});
    }
  }, [open === true]);

  useEffect(() => {
    Object.keys(selectsIndex).forEach((key) => {
      setFiltersQuery((state: any) => ({
        ...state,
        [key]: selectOptions[key][selectsIndex[key]]?.value,
      }));
    });
  }, [selectsIndex]);

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = (date: any) => {
  //   console.warn("A date has been picked: ", date);
  //   hideDatePicker();
  // };

  useEffect(() => {
  
    if (
      range?.startDate !== "Invalid date" &&
      range?.endDate !== "Invalid date"
    )
      setFiltersQuery((state: any) => ({
        ...state,
        [startDateKeyName]: range?.startDate,

        // moment(new Date(range?.startDate))
        //   .add(3, "hours"),
        [endDateKeyName]: range?.endDate,

        // moment(new Date(range?.endDate))
        //   .add(3, "hours"),
      }));
  }, [range]);

  return (
    <Modal
      visible={open}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setOpen(false)}
    >
      <Card disabled={true} style={styles.container}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "800" }}>Filtros</Text>
          <Button
            appearance="ghost"
            style={{ width: 36, height: 36 }}
            onPress={() => setOpen(false)}
          >
            <EvaIcon name="close-circle-outline" width={24} height={24} />
          </Button>
        </View>
        <Divider />
        <Button
          appearance="ghost"
          status="danger"
          onPress={() => {
            if (initialQuery) {
              setQuery(initialQuery);
              Object.keys(initialQuery).forEach((key) => {
                if (selectOptions[key]) {
                  setSelectsIndex((state: any) => ({
                    ...state,
                    [key]: selectOptions[key].findIndex(
                      (item: any) => item.value === initialQuery[key]
                    ),
                  }));
                } else {
                  setFiltersQuery((state: any) => ({
                    ...state,
                    [key]: initialQuery[key],
                  }));
                }
              });
              return;
            }

            setQuery({});
            setSelectsIndex({});
          }}
        >
          Limpar filtros
        </Button>
        {filters.map((filter) => {
          switch (filter.value) {
            case startDateKeyName:
              return (
                <RangeDatepicker
                  label={filter.label}
                  size="large"
                  range={range}
                  onSelect={(nextRange) => setRange(nextRange)}
                />
              );
            case endDateKeyName:
              return;

            default:
              return selectOptions[filter.value] ? (
                <>
                  <Select
                    size="large"
                    value={
                      selectOptions[filter.value][selectsIndex[filter.value]]
                        ?.label
                    }
                    label={filter.label}
                    selectedIndex={selectsIndex[filter.value] || 0}
                    onSelect={(index) =>
                      setSelectsIndex((state: any) => ({
                        ...state,
                        [filter.value]: (index as any)?.row,
                      }))
                    }
                  >
                    {selectOptions[filter.value].map(
                      (option: { value: string; label: string }) => (
                        <SelectItem key={option.label} title={option.label} />
                      )
                    )}
                  </Select>

                  {/* <Button onPress={() => setDatePickerVisibility(true)}>
                    hora inicial
                  </Button> */}
                </>
              ) : (
                <Input size="large" style={{ marginBottom: 8 }} />
              );
          }
        })}
        <Button
          style={{ marginTop: 16 }}
          onPress={() => {
            const newQuery = { ...filtersQuery };
            Object.keys(newQuery).forEach((key) => {
              if (!newQuery[key]) delete newQuery[key];
            });


            setQuery(newQuery);
            setOpen(false);
          }}
        >
          <Text>Aplicar</Text>
        </Button>
      </Card>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 750,
    width: 400,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 0,
    margin: 0,
  },
});
