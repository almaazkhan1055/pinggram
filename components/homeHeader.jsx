import { View, Text, Platform } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { blurhash } from "../utils/common";
import { useAuth } from "../context/authContext";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { MenuItem } from "./customMenuItems";
import { AntDesign, Feather } from "@expo/vector-icons";
import Divider from "./divider";

const ios = Platform.OS === "ios";
const HomeHeader = () => {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();

  const handleProfile = () => {};
  const handleLogout = async () => {
    await logout();
  };
  return (
    <View
      style={{
        paddingTop: ios ? top : top + 10,
        flexDirection: "row",
        justifyContent: "space-between",
        // paddingHorizontal: 5,
        backgroundColor: "#7d89cd",
        // paddingBottom: 6,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomEndRadius: 24,
        borderBottomStartRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
      }}
    >
      <View>
        <Text style={{ fontSize: hp(3.5), color: "white", fontWeight: 500 }}>
          Chats
        </Text>
      </View>
      <View>
        <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {},
            }}
          >
            <Image
              style={{ height: hp(4.8), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl}
              placeholder={blurhash}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 40,
                marginLeft: -30,
                backgroundColor: "white",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 0 },
                width: 160,
              },
            }}
          >
            <MenuItem
              text="Profile"
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
              action={handleProfile}
            />
            <Divider />
            <MenuItem
              text="Logout"
              value={null}
              icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />}
              action={handleLogout}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default HomeHeader;
