import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "../utils/common";

const ChatItem = ({ item, router, noBorder }) => {
  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };
  return (
    <TouchableOpacity
      onPress={openChatRoom}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 3,
        marginHorizontal: 4,
        alignItems: "center",
        marginBottom: 4,
        paddingBottom: 2,
        borderBottomWidth: `${noBorder ? 0 : 1}`,
        borderBottomColor: "#E5E7EB",
      }}
    >
      <Image
        source={item?.profileUrl}
        style={{
          height: hp(6),
          width: wp(6),
          aspectRatio: 1,
          borderRadius: 50,
        }}
        placeholder={blurhash}
        transition={500}
      />
      <View style={{ flex: 1, gap: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: hp(1.8),
              fontWeight: 600,
              color: "#1F2937",
              textTransform: "capitalize",
            }}
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6), fontWeight: 500, color: "#6B7280" }}
          >
            time
          </Text>
        </View>
        <Text style={{ fontSize: hp(1.6), fontWeight: 500, color: "#6B7280" }}>
          Last message
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
