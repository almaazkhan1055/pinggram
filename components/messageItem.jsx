import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MessageItem = ({ message, currentUser }) => {
  if (currentUser?.userId === message.userId) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 3,
          marginRight: 3,
        }}
      >
        <View style={{ width: wp(80) }}>
          <View
            style={{
              display: "flex",
              alignSelf: "flex-end",
              padding: 5,
              borderRadius: 16,
              backgroundColor: "#e6fcfc",
              borderColor: "#b3f7f7",
              borderWidth: 2,
            }}
          >
            <Text style={{ fontSize: hp(1.9), fontWeight: 500 }}>
              {message?.text}
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ width: wp(80), marginLeft: 3, marginBottom: 3 }}>
        <View
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: 5,
            // paddingHorizontal: 3,s
            borderRadius: 16,
            backgroundColor: "#e0e7ff",
            borderColor: "#c7d2fe",
            borderWidth: 2,
          }}
        >
          <Text style={{ fontSize: hp(1.9), fontWeight: 500 }}>
            {message?.text}
          </Text>
        </View>
      </View>
    );
  }
};

export default MessageItem;
