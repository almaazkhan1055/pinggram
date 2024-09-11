import { View, StatusBar, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ChatRoomHeader from "../../components/chatRoomHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MessageList from "../../components/messageList";
import { Feather } from "@expo/vector-icons";

const ChatRoom = () => {
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View
        style={{
          height: hp(1),
          borderBottomColor: "#E5E7EB",
          borderBottomWidth: 1,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: "#F3F4F6",
          overflow: "visible",
        }}
      >
        <View style={{ flex: 1 }}>
          <MessageList messages={messages} />
        </View>
        <View style={{ paddingTop: 2, marginBottom: hp(1.7) }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 3,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "white",
                borderWidth: 2,
                borderColor: "#E5E7EB",
                padding: 2,
                borderRadius: 50,
                paddingLeft: 5,
              }}
            >
              <TextInput
                placeholder="Type message..."
                placeholderTextColor="#a0a2a5"
                style={{
                  flex: 1,
                  marginRight: 2,
                  fontSize: hp(2),
                  padding: 2,
                }}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#E5E7EB",
                  paddingVertical: 3,
                  marginRight: 1,
                  borderRadius: 100,
                }}
              >
                <Feather name="send" size={hp(3)} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatRoom;
