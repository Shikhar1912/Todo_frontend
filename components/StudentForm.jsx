import axios from "axios";
import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function StudentForm({ setFlag }) {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://my-backend-production-144c.up.railway.app/student",
        {
          name,
          rollNumber,
          age: parseInt(age),
          email,
        }
      );
      console.log(response);
      setMessage("Student added successfully!");
      setName("");
      setRollNumber("");
      setAge("");
      setEmail("");
      setFlag((flag) => !flag);
    } catch (error) {
      console.error(error);
      setMessage("Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Roll Number"
        value={rollNumber}
        onChangeText={setRollNumber}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#999"
      />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Submit" onPress={handleSubmit} />
      )}

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  message: {
    marginTop: 15,
    fontWeight: "bold",
    color: "green",
  },
});
