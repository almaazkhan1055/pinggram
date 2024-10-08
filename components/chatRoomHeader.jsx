import React from "react";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image } from "expo-image";

const ChatRoomHeader = ({ user, router }) => {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View style={styles.leftHeader}>
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <View style={styles.userInfo}>
              <Image source={user?.profileUrl} style={styles.profileImage} />
              <Text style={styles.username}>{user?.username}</Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View style={styles.rightHeader}>
            <Ionicons name="call" size={hp(3)} color="#737373" />
            <Ionicons name="videocam" size={hp(3)} color="#737373" />
          </View>
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  profileImage: {
    height: hp(4.5),
    aspectRatio: 1,
    borderRadius: 100,
  },
  username: {
    fontSize: hp(2.5),
    color: "#374151",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    justifyContent: "space-between",
    paddingRight: 4,
  },
});

export default ChatRoomHeader;
