import {
  DrawerGroup,
  DrawerItem,
  Drawer as DrawerModal,
  MenuGroup,
  MenuItem,
} from "@ui-kitten/components";
import { router, useNavigation } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default function Drawer() {
  const [selectedIndex, setSelectedIndex] = useState<any>(null);
  const navigation = useNavigation();

  return (
    <DrawerModal
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <DrawerItem
        accessoryLeft={<Icon name="dashboard" size={20} />}
        style={styles.divider}
        title="Dashboard"
        onPress={() => router.replace("/(app)/dashboard")}
      />
      <DrawerGroup
        title="Cadastros"
        accessoryLeft={<Icon name="add" size={20} />}
        style={styles.menu}
      >
        <DrawerItem style={styles.divider} title="Organização" />

        <DrawerItem style={styles.divider} title="Agregadores" />

        <DrawerItem style={styles.divider} title="Plataformas" />

        <DrawerItem style={styles.divider} title="Operadores" />

        <DrawerItem style={styles.divider} title="Empresas" />

        <DrawerItem style={styles.divider} title="Pessoas" />
      </DrawerGroup>
      <MenuGroup
        title="Movimentações"
        accessoryLeft={<Icon name="send" size={20} />}
    
        style={styles.menu}
      >
        <MenuItem style={styles.divider} title="Lançamentos manuais" />

        <MenuItem style={styles.divider} title="Transferências entre contas" />
      </MenuGroup>
      <MenuGroup
        title="Consultas"
        accessoryLeft={<Icon name="search" size={20} />}
    
        style={styles.menu}
      >
        <MenuItem
          style={styles.divider}
          title="Organização"
          onPress={() => router.replace("/(app)/(consult_organization)/")}
        />

        <MenuItem
          style={styles.divider}
          title="Empresas"
          onPress={() => router.replace("/(app)/(consult_merchant)/")}
        />

        <MenuItem
          style={styles.divider}
          title="Depósitos"
          onPress={() => router.replace("/(app)/(consult_deposits)/")}
        />

        <MenuItem
          style={styles.divider}
          title="Saques"
          onPress={() => router.replace("/(app)/(consult_withdrawals)/")}
        />

        <MenuItem
          style={styles.divider}
          title="Devoluções"
          onPress={() => router.replace("/(app)/(consult_refunds)/")}
        />

        <MenuItem
          style={styles.divider}
          title="Pessoas"
          onPress={() => router.replace("/(app)/(consult_persons)/")}
        />
      </MenuGroup>
      <MenuGroup
        style={styles.menu}
        title="Suporte"
        accessoryLeft={<Icon name="info" size={20} />}
    
      >
        <MenuItem style={styles.divider} title="UI Kitten" />

        <MenuItem style={styles.divider} title="Kitten Tricks" />
      </MenuGroup>
    </DrawerModal>
  );
}
const styles = StyleSheet.create({
  gradient: {
    height: "15%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "60%",
    height: "40%",
    marginTop: 30,
  },
  divider: {
    // borderBottomColor: "#ebebeb",
    // borderBottomWidth: 1,
    // backgroundColor: "#f1f1f1",
  },
  menu: {
    borderBottomColor: "#f7f7f7",
    borderBottomWidth: 1,
  },
});
