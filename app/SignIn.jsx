import { View, StyleSheet, Image, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import register from "../assets/images/register.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Signin = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View style={styles.signin}>
        <View
          style={{
            alignItems: "center",
            paddingTop: hp(8),
            paddingHorizontal: wp(5),
          }}
        >
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={register}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: hp(5),
              fontWeight: 600,
              textAlign: "center",
              color: "#A060FF",
            }}
          >
            Sign In
          </Text>
          <View style={{ height: hp(7) }}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signin: {
    flex: 1,
    gap: 24,
  },
});

export default Signin;
