import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fetchProductDetails } from "../../api/productApi";

const JobDetailsScreen = ({ route }: any) => {
  const { id } = route.params;
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    fetchProductDetails(id).then(setJob);
  }, [id]);

  if (!job)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4b5563" />
        <Text style={styles.loadingText}>Loading Job Details...</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      {/* Company Logo or Job Image */}
      <Image source={{ uri: job.thumbnail }} style={styles.image} />

      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{job.brand || "Creative Tech Park"}</Text>
      <Text style={styles.location}>Merul Badda, Dhaka 1212</Text>
      <Text style={styles.salary}>
        {job.price ? `$${job.price * 1000}` : "Negotiable"}
      </Text>

      <Text style={styles.sectionTitle}>Job Description</Text>
      <Text style={styles.description}>{job.description}</Text>

      <Text style={styles.sectionTitle}>Requirements</Text>
      <Text style={styles.description}>
        - Minimum order quantity: {job.minimumOrderQuantity}
        {"\n"}- Category: {job.category}
        {"\n"}- Stock available: {job.stock} units
      </Text>

      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyText}>Apply Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  loadingText: {
    fontSize: 18,
    color: "#6b7280",
    marginTop: 8,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
    resizeMode: "cover",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 4,
  },
  company: {
    fontSize: 18,
    color: "#6b7280",
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 8,
  },
  salary: {
    fontSize: 20,
    fontWeight: "600",
    color: "#16a34a",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 6,
    marginTop: 12,
  },
  description: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 12,
  },
  applyButton: {
    marginBottom: 50,
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  applyText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default JobDetailsScreen;
