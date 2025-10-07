import { dont, LOGGED_IN_USER, USERS_KEY } from "@/src/constant/String";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = ({ setIsLoggedIn, navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      const users = usersData ? JSON.parse(usersData) : [];

      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!user) {
        Alert.alert("Error", "Invalid email or password");
        return;
      }

      await AsyncStorage.setItem(LOGGED_IN_USER, JSON.stringify(user));
      ToastAndroid.show("Login successful", ToastAndroid.SHORT);

      setIsLoggedIn(true);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>{dont} Sign Up</Text>
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

export default LoginScreen;
