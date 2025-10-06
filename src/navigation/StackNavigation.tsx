import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "../screens/auth/LoginScreen";
import RegistrationScreen from "../screens/auth/RegistrationScreen";
import ProductDetailsScreen from "../screens/product/ProductDetailsScreen";
import BottomNavigator from "./BottomNavigator";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
      {/* Bottom Tabs as main entry */}
      <Stack.Screen name="Main" component={BottomNavigator} />

      {/* Other screens */}
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
