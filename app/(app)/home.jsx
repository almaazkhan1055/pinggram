import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import ChatList from "../../components/chatList";
import { getDocs, query, QuerySnapshot, where } from "firebase/firestore";
import { userRef } from "../../firebaseConfig";

const Home = () => {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const q = query(userRef, where("userId", "!=", user?.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    setUsers(data);
  };

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  });
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View style={{ dislay: "flex", alignItem: "center", top: hp(30) }}>
          <ActivityIndicator size="large" color="#7d89cd" />
        </View>
      )}
      {/* <Text style={styles.text}>Home</Text>
      <Button title="Logout" onPress={handleLogout} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
});

export default Home;
