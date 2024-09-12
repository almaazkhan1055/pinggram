import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
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
import { useAuth } from "../../context/authContext";
import { getRoomId } from "../../utils/common";
import CustomKeyboardView from "../../components/customKeyboardView";
import ChatRoomHeader from "../../components/chatRoomHeader";
import MessageList from "../../components/messageList";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const item = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const textRef = useRef("");
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  const roomId = getRoomId(user?.userId, item?.userId);

  const createRoomIfNotExists = async () => {
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    const message = textRef.current.trim();
    if (!message) return;

    try {
      const messagesRef = collection(doc(db, "rooms", roomId), "messages");
      textRef.current = "";
      inputRef?.current?.clear();

      await addDoc(messagesRef, {
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

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    createRoomIfNotExists();
    const messagesRef = collection(doc(db, "rooms", roomId), "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(allMessages);
      updateScrollView();
    });

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );

    return () => {
      unsubscribe();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <CustomKeyboardView inChat={true}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View style={styles.divider} />
        <View style={styles.messageContainer}>
          <MessageList
            scrollViewRef={scrollViewRef}
            messages={messages}
            currentUser={user}
          />
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer}>
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Type message..."
                placeholderTextColor="#a0a2a5"
                style={styles.textInput}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                style={styles.sendButton}
              >
                <Feather name="send" size={24} color="#737373" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  divider: {
    height: hp(1),
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
  },
  messageContainer: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  inputWrapper: {
    paddingTop: 2,
    marginBottom: hp(2.7),
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    padding: 2,
    borderRadius: 50,
    marginVertical: 3,
  },
  textInput: {
    flex: 1,
    fontSize: hp(2),
    padding: 2,
  },
  sendButton: {
    backgroundColor: "#E5E7EB",
    padding: 8,
    borderRadius: 100,
  },
});

export default ChatRoom;
