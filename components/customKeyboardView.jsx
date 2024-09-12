import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";

const ios = Platform.OS === "ios";

const CustomKeyboardView = ({ children, inChat }) => {
  const kavConfig = inChat ? { keyboardVerticalOffset: 90 } : {};
  const scrollViewConfig = inChat
    ? { contentContainerStyle: styles.scrollContent }
    : {};

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={styles.container}
      {...kavConfig}
    >
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
});

export default CustomKeyboardView;
