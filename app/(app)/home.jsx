import { Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useAuth } from "../../context/authContext";

const Home = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <>
      <Text style={styles.text}>Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
});

export default Home;
