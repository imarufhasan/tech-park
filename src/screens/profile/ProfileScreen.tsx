import { fetchProfileInfo } from "@/src/api/profileApi";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ProfileScreen = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchProfileInfo(1); // pass the user id
      setProfile(data);
      setLoading(false);
    };
    getProfile();
  }, []);

  //changed

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loading}>
        <Text>Failed to load profile</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: profile.image }} style={styles.avatar} />
        <Text style={styles.name}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={styles.username}>@{profile.username}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Email</Text>
        <Text style={styles.infoText}>{profile.email}</Text>

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
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 16 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { alignItems: "center", marginBottom: 24 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 12 },
  name: { fontSize: 24, fontWeight: "700", color: "#1f2937" },
  username: { fontSize: 16, color: "#6b7280" },
  infoSection: { backgroundColor: "#fff", borderRadius: 12, padding: 16 },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    marginTop: 12,
  },
  infoText: { fontSize: 16, color: "#1f2937", marginTop: 4 },
});

export default ProfileScreen;
