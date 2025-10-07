import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { LOGGED_IN_USER } from "../constant/String";
import LoginScreen from "../screens/auth/LoginScreen";
import RegistrationScreen from "../screens/auth/RegistrationScreen";
import ProductDetailsScreen from "../screens/product/ProductDetailsScreen";
import BottomNavigator from "./BottomNavigator";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const userData = await AsyncStorage.getItem(LOGGED_IN_USER);
      setIsLoggedIn(!!userData);
      setIsLoading(false);
    };
    checkLogin();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          {/* Main app with Bottom Tabs */}
          <Stack.Screen name="Main">
            {(props) => (
              <BottomNavigator
                {...props}
                setIsLoggedIn={setIsLoggedIn} // pass setter
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ headerShown: true }}
          />
        </>
      ) : (
        <>
          {/* Auth flow */}
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register" component={RegistrationScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
