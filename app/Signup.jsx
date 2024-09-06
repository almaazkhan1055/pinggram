import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import register from "../assets/images/register.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign up", "Please fill all the fields!");
      return;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View style={styles.Login}>
        <Animatable.View
          animation="slideInDown"
          style={{
            alignItems: "center",
            paddingTop: hp(5),
            paddingHorizontal: wp(5),
          }}
        >
          <Image
            style={{ height: hp(25) }}
            resizeMode="contain"
            source={register}
          />
        </Animatable.View>
        <View style={{ paddingHorizontal: 20, gap: 30 }}>
          <Animatable.Text
            animation="slideInRight"
            style={{
              fontSize: hp(5),
              fontWeight: 600,
              textAlign: "center",
              color: "black",
            }}
          >
            Sign Up
          </Animatable.Text>
          <View style={{ gap: 16 }}>
            <Animatable.View
              animation="slideInUp"
              style={{
                height: hp(7),
                flexDirection: "row",
                paddingHorizontal: 10,
                gap: 16,
                alignItems: "center",
                borderRadius: 15,
                backgroundColor: "#f3f4f6",
              }}
            >
              <Feather size={hp(2.7)} color="gray" name="mail" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{
                  fontSize: hp(2),
                  flex: 1,
                  fontWeight: "400",
                  color: "#404040",
                }}
                keyboardType="email-address"
                placeholder="Enter your email"
                placeholderTextColor="gray"
              />
            </Animatable.View>
            <View style={{ gap: 8 }}>
              <Animatable.View
                animation="slideInUp"
                style={{
                  height: hp(7),
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  gap: 16,
                  alignItems: "center",
                  borderRadius: 15,
                  backgroundColor: "#f3f4f6",
                }}
              >
                <FontAwesome5 name="user-lock" size={hp(2.7)} color="gray" />
                <TextInput
                  onChangeText={(value) => (passwordRef.current = value)}
                  style={{
                    fontSize: hp(2),
                    flex: 1,
                    fontWeight: "400",
                    color: "#404040",
                  }}
                  secureTextEntry={true}
                  placeholder="Enter your password"
                  placeholderTextColor="gray"
                />
              </Animatable.View>
              <Text
                style={{
                  textAlign: "right",
                  fontWeight: "700",
                  color: "#737373",
                  fontSize: hp(1.8),
                }}
              >
                Forgot Password?
              </Text>
            </View>

            <View>
              {loading ? (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <Animatable.View animation="slideInLeft">
                  <TouchableOpacity
                    onPress={handleRegister}
                    style={{
                      backgroundColor: "#6366F1",
                      alignItems: "center",
                      borderRadius: 15,
                      paddingVertical: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: hp(2.7),
                        color: "white",
                        fontWeight: "700",
                      }}
                    >
                      Create account
                    </Text>
                  </TouchableOpacity>
                </Animatable.View>
              )}
            </View>

            <Animatable.View
              animation="slideInUp"
              style={{ flexDirection: "row", justifyContent: "center" }}
            >
              <Text
                style={{ fontSize: hp(1.8), fontWeight: 500, color: "#737373" }}
              >
                Already have an account?
              </Text>
              <Pressable onPress={() => router.push("/Login")}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontWeight: 700,
                    color: "#6366F1",
                  }}
                >
                  Login
                </Text>
              </Pressable>
            </Animatable.View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Login: {
    flex: 1,
    gap: 24,
  },
});

export default Signup;
