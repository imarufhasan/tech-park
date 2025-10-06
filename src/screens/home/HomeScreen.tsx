import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { fetchProducts } from "../../api/productApi";
import JobCard from "../../components/JobCard";

const HomeScreen = ({ navigation }: any) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts().then(setJobs);
  }, []);

  const handleSaveJob = (job: any) => {
    if (!savedJobs.find((j) => j.id === job.id)) {
      setSavedJobs([...savedJobs, job]);
    } else {
      setSavedJobs(savedJobs.filter((j) => j.id !== job.id));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f4f6", padding: 12 }}>
      {/* header text */}
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
              company: item.brand, // using product brand as company
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
