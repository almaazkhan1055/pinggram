import { Text, StyleSheet } from "react-native";
import React from "react";

const Home = () => {
  return (
    <>
      <Text style={styles.text}>Home</Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
});

export default Home;
