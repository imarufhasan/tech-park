import { STORAGE_KEY } from "@/src/constant/String";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { fetchProducts } from "../../api/productApi";
import JobCard from "../../components/JobCard";

const HomeScreen = ({ navigation }: any) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // <-- loader state

  // Fetch jobs from API
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchProducts();
        setJobs(data);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      } finally {
        setLoading(false); // hide loader
      }
    };

    loadJobs();
  }, []);

  // Load saved jobs from AsyncStorage
  useEffect(() => {
    const loadSavedJobs = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) setSavedJobs(JSON.parse(savedData));
      } catch (error) {
        console.log("Error loading saved jobs:", error);
      }
    };

    loadSavedJobs();
  }, []);

  const handleSaveJob = async (job: any) => {
    try {
      let updatedJobs;
      if (!savedJobs.find((j) => j.id === job.id)) {
        updatedJobs = [...savedJobs, job];
      } else {
        updatedJobs = savedJobs.filter((j) => j.id !== job.id);
      }
      setSavedJobs(updatedJobs);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
    } catch (error) {
      console.log("Error saving job:", error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f4f6", padding: 12 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#1f2937" }}>
          Jobs
        </Text>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard
            item={{
              title: item.title,
              company: item.brand,
              location: "Merul Badda, Dhaka",
              salary: "$50k - $60k",
              id: item.id,
            }}
            onPress={() =>
              navigation.navigate("ProductDetails", { id: item.id })
            }
            onSave={handleSaveJob}
            saved={savedJobs.some((j) => j.id === item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 12 }}
      />
    </View>
  );
};

export default HomeScreen;
