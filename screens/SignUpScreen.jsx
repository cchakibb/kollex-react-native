import React, { useState } from "react";
import { Text, TextInput, StyleSheet, KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AsyncStorage } from "react-native";
import { useNavigation } from "@react-navigation/core";
import zxcvbn from "zxcvbn";

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNb, setPhoneNb] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView extraScrollHeight={110} contentContainerStyle={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={styles.inputs}
          placeholder="Firstname"
          onChangeText={(text) => {
            setFirstName(text);
          }}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Lastname"
          onChangeText={(text) => {
            setLastName(text);
          }}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Phone number"
          keyboardType="numeric"
          onChangeText={(text) => {
            setPhoneNb(text);
          }}
        />
        <TextInput
          style={styles.inputs}
          autoCapitalize="none"
          placeholder="E-Mail address"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={styles.inputs}
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => {
            setPassword1(text);
          }}
        />
        {zxcvbn(password1).score === 0 && password1.length > 0 ? (
          <Text style={{ color: "red" }}>Anyone can guess ! 👀</Text>
        ) : zxcvbn(password1).score === 1 ? (
          <Text style={{ color: "red" }}>Too weak ! 😭</Text>
        ) : zxcvbn(password1).score === 2 ? (
          <Text style={{ color: "orange" }}>Still weak ! 🤷🏻‍♂️</Text>
        ) : zxcvbn(password1).score === 3 ? (
          <Text style={{ color: "orange" }}>Fair enough ! </Text>
        ) : zxcvbn(password1).score === 4 ? (
          <Text style={{ color: "green" }}>Very secure password ! 😍</Text>
        ) : null}
        <TextInput
          style={styles.inputs}
          secureTextEntry={true}
          placeholder="Confirm password"
          onChangeText={(text) => {
            setPassword2(text);
          }}
        />
        {password2.length > 0 && password1 !== password2 ? <Text>Passwords don't match</Text> : null}
        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={async () => {
            if ((email, phoneNb, password1, password2)) {
              const value = JSON.stringify({
                firstName,
                lastName,
                email,
                phoneNb,
                password1,
              });
              await AsyncStorage.setItem("userToken", value);
              navigation.navigate("Home");
            } else {
              alert("Email, phone and password are mandatory fields");
            }
          }}
        >
          <Text style={styles.signUpTxt}>Sign Up !</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    justifyContent: "center",
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
  signUpBtn: {
    marginTop: 20,
    width: 120,
    height: 48,
    backgroundColor: "black",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpTxt: {
    color: "white",
  },
});
