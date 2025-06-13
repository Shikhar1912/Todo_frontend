import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import List from "../components/List";
import StudentForm from "../components/StudentForm";
export default function HomeScreen() {
  const [flag, setFlag] = useState("false");
  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.heading}> Welcome</Text>
      <StudentForm setFlag={setFlag} />
      <List flag={flag} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "white",
  },
  scroll: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 80
  },
});
