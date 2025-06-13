import axios from "axios";
import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Button,
} from "react-native";

export default function List({flag}) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    const getStudents = async () => {
      setLoading(true);
      try {
        
        const response = await axios.get(
          "https://my-backend-production-144c.up.railway.app/students"
        );
        setStudents(response.data);
      } catch (err) {
        console.error("Failed to fetch:", err.message);
      } finally {
        setLoading(false);
      }
    };

    getStudents();
  }, [flag]);

  const handleViewDetails = async (roll_number) => {
    setDetailLoading(true);
    setModalVisible(true);

    try {
      const response = await axios.get(
        `https://my-backend-production-144c.up.railway.app/student/${roll_number}`
      );
      setSelectedStudent(response.data);
    } catch (err) {
      console.error("Failed to fetch student details:", err.message);
      setSelectedStudent(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.roll}>Roll No: {item.roll_number}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleViewDetails(item.roll_number)}
      >
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.roll_number}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {detailLoading ? (
            <ActivityIndicator size="large" />
          ) : selectedStudent ? (
            <View>
              <Text style={styles.modalTitle}>Student Details</Text>
              <Text>Name: {selectedStudent.name}</Text>
              <Text>Roll No: {selectedStudent.roll_number}</Text>
              <Text>Age: {selectedStudent.age}</Text>
              <Text>Email: {selectedStudent.email}</Text>
            </View>
          ) : (
            <Text>Failed to load student data</Text>
          )}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  roll: {
    fontSize: 14,
    color: "#555",
  },
  button: {
    backgroundColor: "#4e73df",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
