import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../screens/home/HomeScreen";
import SavedJobsScreen from "../screens/product/SavedJobsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

interface BottomNavigatorProps {
  setIsLoggedIn: (value: boolean) => void;
}

const BottomNavigator = ({ setIsLoggedIn }: BottomNavigatorProps) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: { paddingVertical: 6, height: 60 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";

          if (route.name === "Home")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "SavedJobs")
            iconName = focused ? "bookmark" : "bookmark-outline";
          else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="SavedJobs"
        component={SavedJobsScreen}
        options={{ title: "Saved Jobs" }}
      />

      {/* Pass setIsLoggedIn to ProfileScreen for logout */}
      <Tab.Screen name="Profile" options={{ title: "Profile" }}>
        {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomNavigator;
