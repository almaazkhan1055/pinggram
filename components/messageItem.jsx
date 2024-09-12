import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MessageItem = ({ message, currentUser }) => {
  const isCurrentUser = currentUser?.userId === message.userId;

  return (
    <View
      style={[
        styles.container,
        isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer,
      ]}
    >
      <View style={styles.messageWrapper}>
        <View
          style={[
            styles.messageBox,
            isCurrentUser
              ? styles.currentUserMessageBox
              : styles.otherUserMessageBox,
          ]}
        >
          <Text style={styles.messageText}>{message?.text}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 3,
  },
  currentUserContainer: {
    justifyContent: "flex-end",
    marginRight: 3,
  },
  otherUserContainer: {
    justifyContent: "flex-start",
    marginLeft: 3,
  },
  messageWrapper: {
    width: wp(80),
  },
  messageBox: {
    padding: 5,
    borderRadius: 16,
  },
  currentUserMessageBox: {
    alignSelf: "flex-end",
    backgroundColor: "#e6fcfc",
    borderColor: "#b3f7f7",
    borderWidth: 2,
  },
  otherUserMessageBox: {
    alignSelf: "flex-start",
    backgroundColor: "#e0e7ff",
    borderColor: "#c7d2fe",
    borderWidth: 2,
  },
  messageText: {
    fontSize: hp(1.9),
    fontWeight: "500",
  },
});

export default MessageItem;
