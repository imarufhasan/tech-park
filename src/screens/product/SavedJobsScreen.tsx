import JobCard from "@/src/components/JobCard";
import React from "react";
import { FlatList, Text, View } from "react-native";

const SavedJobsScreen = ({ savedJobs, navigation }: any) => {
  return (
    <View style={{ flex: 1, padding: 12, backgroundColor: "#f3f4f6" }}>
      {savedJobs?.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          No saved jobs yet.
        </Text>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <JobCard
              item={item}
              onPress={() => navigation.navigate("JobDetails", { id: item.id })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 12 }}
        />
      )}
    </View>
  );
};

export default SavedJobsScreen;
