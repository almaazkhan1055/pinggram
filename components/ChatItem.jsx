import { TouchableOpacity, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash, formatDate, getRoomId } from "../utils/common";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const ChatItem = ({ item, router, noBorder, currentUser }) => {
  const [lastMessage, setLastMessage] = useState(null);

  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  const renderTime = () => {
    if (lastMessage) {
      let date = lastMessage?.createdAt;
      return formatDate(new Date(date?.seconds * 1000));
    }
  };

  const renderLastMessage = () => {
    if (!lastMessage)
      return `Say Hi to ${
        item.username.charAt(0).toUpperCase() + item.username.slice(1)
      } 👋`;
    if (currentUser.userId === lastMessage.userId)
      return "You: " + lastMessage?.text;
    return lastMessage?.text;
  };

  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => doc.data());
      setLastMessage(allMessages[0] || null);
    });

    return unsub;
  }, []);

  return (
    <TouchableOpacity
      onPress={openChatRoom}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        marginHorizontal: 5,
        alignItems: "center",
        marginBottom: 4,
        paddingVertical: 10,
        borderBottomWidth: noBorder ? 0 : 1,
        borderBottomColor: "#E5E7EB",
      }}
    >
      <Image
        source={{ uri: item?.profileUrl }}
        style={{
          width: wp(10),
          aspectRatio: 1,
          borderRadius: 50,
        }}
        placeholder={blurhash}
        transition={500}
      />
      <View style={{ flex: 1, gap: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: hp(1.8),
              fontWeight: "600",
              color: "#1F2937",
              textTransform: "capitalize",
            }}
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6), fontWeight: "500", color: "#6B7280" }}
          >
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6), fontWeight: "500", color: "#6B7280" }}
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
