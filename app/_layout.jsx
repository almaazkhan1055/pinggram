import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;
    const inApp = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      router.replace("home");
    } else if (isAuthenticated === false) {
      router.replace("Login");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <AuthContextProvider style={styles.main}>
      <MainLayout />
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
export default RootLayout;
