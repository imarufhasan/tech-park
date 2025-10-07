import { STORAGE_KEY } from "@/src/constant/String";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import JobCard from "../../components/JobCard";

const SavedJobsScreen = ({ navigation }: any) => {
  const [savedJobs, setSavedJobs] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadSavedJobs();
    });
    return unsubscribe;
  }, [navigation]);

  const loadSavedJobs = async () => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      console.log("savedData: ", JSON.parse(savedData || "[]")?.length);

      setSavedJobs(savedData ? JSON.parse(savedData) : []);
    } catch (error) {
      console.log("Error loading saved jobs:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
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
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Saved Jobs</Text>
      </View>

      {savedJobs.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 40, color: "#6b7280" }}>
          No saved jobs yet.
        </Text>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <JobCard
              item={item}
              onPress={() =>
                navigation.navigate("ProductDetails", { id: item.id })
              }
              onSave={() => {}}
              saved={true}
            />
          )}
          contentContainerStyle={{ padding: 12 }}
        />
      )}
    </View>
  );
};

export default SavedJobsScreen;
