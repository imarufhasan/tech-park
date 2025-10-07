import { fetchProfileInfo } from "@/src/api/profileApi";
import { LOGGED_IN_USER, STORAGE_KEY, USERS_KEY } from "@/src/constant/String";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = ({ navigation, setIsLoggedIn }: any) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any[]>([]);

  useEffect(() => {
    const getLocalUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem(USERS_KEY);
        if (userData) setProfile(JSON.parse(userData));
        setUserInfo(JSON.parse(userData || "[]"));
        console.log("userData: ", JSON.parse(userData || "[]"));
      } catch (error) {
        console.log("Error loading user data:", error);
      }
    };

    const getProfile = async () => {
      const data = await fetchProfileInfo(1);
      setProfile(data);
      setLoading(false);
    };

    getProfile();
    getLocalUserData();
  }, []);

  const getSavedJobs = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      setSavedJobs(savedData ? JSON.parse(savedData) : []);
    } catch (error) {
      console.log("Error loading jobs:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSavedJobs();
    }, [])
  );

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem(LOGGED_IN_USER);
          setIsLoggedIn(false);
        },
      },
    ]);
  };

  if (loading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  if (!profile)
    return (
      <View style={styles.loading}>
        <Text>Failed to load profile</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#dce1ebff",
          padding: 12,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.header}>
          <Ionicons name="person-circle" size={100} color="#1f2124ff" />
          <Text style={styles.name}>
            {profile.firstName} {profile.lastName}
          </Text>
          <Text style={styles.username}>@{profile.username}</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Main", { screen: "SavedJobs" })}
            style={styles.savedButton}
          >
            <Text style={styles.savedText}>
              Total Saved Jobs: {savedJobs?.length}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Email</Text>
          <Text style={styles.infoText}>
            {userInfo[0]?.email || "email@gmail.com"}
          </Text>

          <Text style={styles.infoTitle}>Phone</Text>
          <Text style={styles.infoText}>{profile.phone}</Text>

          <Text style={styles.infoTitle}>Company</Text>
          <Text style={styles.infoText}>{profile.company?.name}</Text>

          <Text style={styles.infoTitle}>Department</Text>
          <Text style={styles.infoText}>{profile.company?.department}</Text>

          <Text style={styles.infoTitle}>Role</Text>
          <Text style={styles.infoText}>{profile.role}</Text>

          <Text style={styles.infoTitle}>Address</Text>
          <Text style={styles.infoText}>
            {profile.address?.address}, {profile.address?.city},{" "}
            {profile.address?.state}
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { alignItems: "center", marginTop: 20, marginBottom: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 12 },
  name: { fontSize: 26, fontWeight: "700", color: "#1f2937" },
  username: { fontSize: 16, color: "#6b7280", marginBottom: 12 },
  savedButton: {
    backgroundColor: "#437ff0",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 8,
  },
  savedText: { fontSize: 16, fontWeight: "600", color: "#fff" },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    marginTop: 12,
  },
  infoText: { fontSize: 16, color: "#1f2937", marginTop: 4 },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#ef4444",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutText: { fontSize: 18, fontWeight: "bold", color: "#fff" },
});

export default ProfileScreen;
