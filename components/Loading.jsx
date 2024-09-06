import { ActivityIndicator, View } from "react-native";
import React from "react";

const Loading = ({ size }) => {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <ActivityIndicator size="large" color="#6770C6" />
    </View>
  );
};

export default Loading;
