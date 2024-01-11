import {
  Button,
  Icon,
  IconElement,
  MenuItem,
  OverflowMenu,
  TopNavigationAction,
} from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Avatar } from "react-native-elements";
import Colors from "../constants/Colors";
import { useSession } from "../contexts/ctx";

export default function useHeader() {
  const { session, isLoading, user, signOut, signByStorage } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  const MenuIcon = (props: any): IconElement => (
    <Avatar
      rounded
      title={user?.name[0]}
      avatarStyle={{ backgroundColor: "#cccbcb1f" }}
    />
  );

  const InfoIcon = (props: any): IconElement => (
    <Icon
      name="person-outline"
      color={Colors.light.secondary}
      style={{ fontSize: 14 }}
    />
  );

  const LogoutIcon = (props: any): IconElement => (
    <Icon
      name="logout"
      color={Colors.light["color-danger-900"]}
      style={{ fontSize: 14 }}
    />
  );

  // This layout can be deferred because it's not the root layout.
  const renderMenuAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const GradientHeader = () => (
    <LinearGradient
      colors={[Colors.light.secondary, Colors.light["color-primary-600"]]}
      style={{ flex: 1 }}
    >
      {/* Your header content goes here */}
    </LinearGradient>
  );

  const header: any = {
    headerBackground: () => <GradientHeader />,
    headerTintColor: "#fff",
    headerTitleAlign: "center",
    navigationBarColor: "#ffffff0",
    headerLeft: () => (
      <Button appearance="ghost" onPress={() => router.push("/drawer")}>
        <Icon name="menu" color={"#fff"} />
      </Button>
    ),
    headerRight: () => (
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
      >
        <MenuItem accessoryLeft={InfoIcon} title="Perfil" />
        <MenuItem
          accessoryLeft={LogoutIcon}
          title="Sair"
          onPressOut={() => signOut()}
        />
      </OverflowMenu>
    ),
  };

  return header;
}
