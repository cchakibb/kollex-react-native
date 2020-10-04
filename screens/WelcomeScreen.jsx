import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState({});

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      const data = JSON.parse(userToken);
      setUser(data);
    };

    bootstrapAsync();
  }, []);

  return (
    <View style={styles.container}>
      {user.firstName ? <Text>First name: {user.firstName}</Text> : null}
      {user.lastName ? <Text>First name: {user.lastName}</Text> : null}
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phoneNb}</Text>
      <Text>Password: {user.password1} (Hidden in production)</Text>

      <TouchableOpacity
        style={styles.logOutBtn}
        onPress={async () => {
          await AsyncStorage.removeItem("userToken");
          navigation.navigate("SignIn");
        }}
      >
        <Text style={styles.logOutTxt}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    justifyContent: "center",
  },
  logOutBtn: {
    width: 120,
    height: 48,
    marginTop: 40,
    backgroundColor: "black",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  logOutTxt: {
    color: "white",
  },
});
