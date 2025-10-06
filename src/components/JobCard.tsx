import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  item: {
    title: string;
    company: string;
    location: string;
    salary: string;
    id: number;
  };
  onPress: () => void;
  onSave?: (job: any) => void; // for saving job
  saved?: boolean;
}

const JobCard = ({ item, onPress, onSave, saved }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleApply = () => {
    setModalVisible(false);
    Alert.alert("Success", "You have successfully applied for this job!");
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.textContainer} onPress={onPress}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.company}>
          {item?.company || "Creative Tech Park"}
        </Text>
        <Text style={styles.location}>
          {item.location || "Merul Badda, Dhaka 1212"}
        </Text>
        <Text style={styles.salary}>{item.salary || "50k - 60k"}</Text>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.applyText}>Apply Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSave && onSave(item)}
          style={styles.saveButton}
        >
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={24}
            color="#3b82f6"
          />
        </TouchableOpacity>
      </View>

      {/* Apply Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Application</Text>
            <Text style={styles.modalText}>
              Are you sure you want to apply for {item.title} at {item.company}?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#10b981" }]}
                onPress={handleApply}
              >
                <Text style={styles.modalButtonText}>Yes, Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ef4444" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 6,
  },
  company: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 8,
  },
  salary: {
    fontSize: 16,
    fontWeight: "600",
    color: "#10b981",
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  applyButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default JobCard;
