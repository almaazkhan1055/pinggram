import { View, StatusBar, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import ChatRoomHeader from "../../components/chatRoomHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MessageList from "../../components/messageList";
import { Feather } from "@expo/vector-icons";
import CustomKeyboardView from "../../components/customKeyboardView";
import { useAuth } from "../../context/authContext";
import { getRoomId } from "../../utils/common";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);

  const item = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const textRef = useRef("");
  const inputRef = useRef(null);

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();
      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      Alert.alert("Message", error.message);
    }
  };

  useEffect(() => {
    createRoomIfNotExists();
    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });
    return unsub;
  }, []);

  return (
    <CustomKeyboardView inChat={true}>
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
          <View style={{ paddingTop: 2, marginBottom: hp(2.7) }}>
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
                marginVertical: 3,
              }}
            >
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
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
                onPress={handleSendMessage}
                style={{
                  backgroundColor: "#E5E7EB",
                  padding: 8,
                  marginRight: 1,
                  borderRadius: 100,
                }}
              >
                <Feather name="send" size="24" color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default ChatRoom;
