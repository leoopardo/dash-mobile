import { IconOutline } from "@ant-design/icons-react-native";
import { Button, Input, Spinner, Text } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, Platform, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import Colors from "../constants/Colors";
import { useSession } from "../contexts/ctx";
import { router } from "expo-router";

export default function LoginLayout() {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const { signIn, setCredentials, isLoading, error, success } = useSession();

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <IconOutline
        name={!secureTextEntry ? "eye-invisible" : "eye"}
        size={32}
      />
    </TouchableWithoutFeedback>
  );

  const renderCaption = (): React.ReactElement => {
    return (
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>Senha ou usuário incorreto.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={[Colors.light.secondary, Colors.light.primary]}
        style={styles.gradient}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </LinearGradient>
      <View style={styles.roundShapeLock}>
        <IconOutline name="lock" size={36} style={styles.lock} />
      </View>

      <Text style={styles.title}>Faça login</Text>

      <Input
        style={styles.input}
        size="large"
        placeholder="Nome de usuário"
        label={"Usuário"}
        onChangeText={(nextValue) => {
          setCredentials((state) => ({ ...state, username: nextValue }));
        }}
        status={error ? "danger" : "basic"}
      />

      <Input
        style={styles.input}
        label="Password"
        placeholder="**********"
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={(nextValue) => {
          setCredentials((state) => ({ ...state, password: nextValue }));
        }}
        status={error ? "danger" : "basic"}
        caption={error && renderCaption}
      />

      <Button
        size="large"
        style={styles.loginButton}
        onPress={() => {
          signIn(), router.push("/");
        }}
      >
        {isLoading ? <Spinner /> : "Entrar"}
      </Button>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -220,
  },
  gradient: {
    height: "60%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  lock: { color: "#fff" },
  roundShapeLock: {
    height: 60,
    width: 60,
    backgroundColor: Colors.light.primary,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -27,
  },
  logo: { width: "100%", marginTop: 210 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  loginButton: {
    width: "80%",
    marginTop: 30,
  },
  input: {
    width: "80%",
    marginTop: 16,
  },
  captionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "opensans-regular",
    color: Colors.light.error,
  },
});
