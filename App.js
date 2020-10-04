import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

/* Screens */
import SignInScreen from "./screens/SignInScreen.jsx";
import SignUpScreen from "./screens/SignUpScreen.jsx";
import WelcomeScreen from "./screens/WelcomeScreen.jsx";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" options={{ header: () => null }}>
          {() => <SignInScreen />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" options={{ header: () => null }}>
          {() => <SignUpScreen />}
        </Stack.Screen>
        <Stack.Screen name="Home" component={WelcomeScreen} options={{ header: () => null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    justifyContent: "center",
  },
});
