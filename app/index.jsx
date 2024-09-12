import { StyleSheet, View, Image, ActivityIndicator } from "react-native";
import React from "react";
import chatlogo from "../assets/images/chatlogo.png";

const StartPage = () => {
  return (
    <View style={styles.container}>
      <Image source={chatlogo} />
      <ActivityIndicator size="large" color="#00E4E3" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartPage;
