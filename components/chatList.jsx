import { View, FlatList } from "react-native";
import React from "react";
import ChatItem from "./ChatItem";
import { useRouter } from "expo-router";

const ChatList = ({ users, currentUser }) => {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 25 }}
        keyExtractor={(item) => item.userId.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            currentUser={currentUser}
            noBorder={index + 1 === users.length}
            router={router}
            item={item}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default ChatList;
