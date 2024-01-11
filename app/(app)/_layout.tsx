import {
  Button,
  IconElement,
  MenuItem,
  OverflowMenu,
  TopNavigationAction,
} from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, Stack, router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import Colors from "../../constants/Colors";
import { useSession } from "../../contexts/ctx";
import { useValidate } from "../../services/auth/useValidateToken";
import useHeader from "../../components/header";

export default function AppLayout() {
  const { session, isLoading, user, signOut, signByStorage } = useSession();
  const [menuVisible, setMenuVisible] = useState(false);
  const { validateError } = useValidate(session || "");
  const header = useHeader();

  if (!user && session) {
    signByStorage();
  }
  if (!session) {
    return <Redirect href="/sign-in" />;
  }
  if (validateError) {
    signOut();
    return <Redirect href="/sign-in" />;
  }

  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

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

  return (
    <Stack screenOptions={{
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
    }}>
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
        }}
      />
      <Stack.Screen
        name="drawer"
        options={{
          animation: "slide_from_left",
          presentation: "containedModal",
          headerTitle: "",
          headerRight: () => "",
          headerLeft: () => (
            <Button appearance="ghost" onPress={() => router.back()}>
              <Icon name="menu-open" color={"#fff"} size={32} />
            </Button>
          ),
          headerBackground: () => (
            <>
              <LinearGradient
                colors={[
                  Colors.light.secondary,
                  Colors.light["color-primary-600"],
                ]}
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/images/logo.png")}
                  resizeMode="stretch"
                  style={styles.logo}
                />
              </LinearGradient>
            </>
          ),
        }}
      />
      <Stack.Screen
        name="(consult_deposits)"
        options={{
          title: "Depósitos",
          headerShown: true,
        }}
      />
     
    </Stack>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: 230,
    marginTop: 50,
  },
});
