import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Image, Text, TextInput, AsyncStorage, View, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from "react-native";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  const navigation = useNavigation();

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
      <Image style={styles.logo} source={require("../assets/kollexLogo.jpg")} />
      <Text style={styles.text}>Melde dich hier an</Text>
      <TextInput
        style={styles.inputs}
        autoCapitalize="none"
        placeholder="E-Mail Adresse"
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.inputs}
        placeholder="Passwort"
        onChangeText={(text) => {
          setPassword(text);
        }}
      />

      <TouchableOpacity
        style={styles.signInBtn}
        onPress={() => {
          if (user) {
            if (email === user.email && password === user.password1) {
              navigation.navigate("Home");
            } else {
              alert("Wrong credentials");
            }
          } else if (user === null) {
            alert("Wrong credentials");
          } else alert("Wrong credentials");
        }}
      >
        <Text style={styles.anmelden}>Anmelden</Text>
      </TouchableOpacity>
      <Text style={styles.noAccountYet}>Ich habe noch keinen kollex-Account</Text>
      <TouchableOpacity
        style={styles.signUpBtn}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={styles.registrieren}>Jetzt Registrieren</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
  },
  text: {
    marginBottom: 15,
    marginLeft: -180,
    fontSize: 20,
  },
  inputs: {
    marginTop: 20,
    height: 45,
    width: 380,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 25,
  },
  signInBtn: {
    marginTop: 20,
    width: 380,
    height: 48,
    backgroundColor: "black",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  anmelden: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  noAccountYet: {
    marginTop: 10,
    fontSize: 24,
  },
  signUpBtn: {
    marginTop: 10,
    width: 220,
    height: 48,
    backgroundColor: "black",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  registrieren: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
  },
});
