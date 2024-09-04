import { StyleSheet, View, Text } from "react-native";
import React from "react";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.font}>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  font: {
    color: "white",
    fontWeight: "700",
    fontSize: "50px",
  },
});

export default Home;
