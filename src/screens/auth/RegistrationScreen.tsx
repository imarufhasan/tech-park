import { USERS_KEY } from "@/src/constant/String";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const RegistrationScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSignUp = async () => {
  //   if (!email || !password) {
  //     Alert.alert("Error", "Email and password are required");
  //     return;
  //   }

  //   try {
  //     const usersData = await AsyncStorage.getItem(USERS_KEY);
  //     const users = usersData ? JSON.parse(usersData) : [];

  //     // check if email already exists
  //     if (users.find((u: any) => u.email === email)) {
  //       Alert.alert("Error", "Email already exists");
  //       return;
  //     }

  //     const newUser = { email, password };
  //     await AsyncStorage.setItem(
  //       USERS_KEY,
  //       JSON.stringify([...users, newUser])
  //     );

  //     Alert.alert("Success", "Account created successfully!");
  //     navigation.navigate("Login");
  //   } catch (error) {
  //     console.log("Error saving user:", error);
  //   }
  // };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required");
      return;
    }

    try {
      // Clear all existing users
      await AsyncStorage.removeItem(USERS_KEY);

      // Add new user
      const newUser = { email, password };
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify([newUser]));

      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Error saving user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor={"#ccc"}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={"#ccc"}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    color: "#000",
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  link: { textAlign: "center", marginTop: 16, color: "#3b82f6" },
});

export default RegistrationScreen;
