import React, { useRef, useState } from "react";
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
import { StatusBar } from "expo-status-bar";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../components/Loading";
import CustomKeyboardView from "../components/customKeyboardView";
import { useAuth } from "../context/authContext";
import registerImage from "../assets/images/register.png";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    const email = emailRef.current;
    const password = passwordRef.current;

    if (!email || !password) {
      Alert.alert("Login", "Please fill all the fields!");
      return;
    }

    setLoading(true);
    const response = await login(email, password);
    setLoading(false);

    if (!response.success) {
      Alert.alert("Login", response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Animatable.View animation="slideInDown" style={styles.imageWrapper}>
          <Image
            source={registerImage}
            style={styles.image}
            resizeMode="contain"
          />
        </Animatable.View>

        <View style={styles.form}>
          <Animatable.Text animation="slideInRight" style={styles.title}>
            Login
          </Animatable.Text>

          <View style={styles.inputWrapper}>
            <Animatable.View
              animation="slideInUp"
              style={styles.inputContainer}
            >
              <Feather name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="gray"
                keyboardType="email-address"
                onChangeText={(value) => (emailRef.current = value)}
                style={styles.input}
              />
            </Animatable.View>

            <Animatable.View
              animation="slideInUp"
              style={styles.inputContainer}
            >
              <AntDesign name="lock1" size={hp(2.7)} color="gray" />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="gray"
                secureTextEntry
                onChangeText={(value) => (passwordRef.current = value)}
                style={styles.input}
              />
            </Animatable.View>

            <Text style={styles.forgotPassword}>Forgot Password?</Text>

            <View>
              {loading ? (
                <Loading size={hp(6.5)} />
              ) : (
                <Animatable.View animation="slideInLeft">
                  <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginText}>Login</Text>
                  </TouchableOpacity>
                </Animatable.View>
              )}
            </View>

            <Animatable.View animation="slideInUp" style={styles.signupWrapper}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <Pressable onPress={() => router.push("/Signup")}>
                <Text style={styles.signupLink}> Signup</Text>
              </Pressable>
            </Animatable.View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    alignItems: "center",
    paddingTop: hp(5),
    paddingHorizontal: wp(5),
  },
  image: {
    height: hp(25),
  },
  form: {
    paddingHorizontal: 20,
    gap: 30,
  },
  title: {
    fontSize: hp(5),
    fontWeight: "600",
    textAlign: "center",
    color: "black",
  },
  inputWrapper: {
    gap: 16,
  },
  inputContainer: {
    height: hp(7),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 16,
    borderRadius: 15,
    backgroundColor: "#f3f4f6",
  },
  input: {
    flex: 1,
    fontSize: hp(2),
    color: "#404040",
  },
  forgotPassword: {
    textAlign: "right",
    fontWeight: "700",
    color: "#737373",
    fontSize: hp(1.8),
  },
  loginButton: {
    backgroundColor: "#6366F1",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
  },
  loginText: {
    fontSize: hp(2.7),
    color: "white",
    fontWeight: "700",
  },
  signupWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    fontSize: hp(1.8),
    fontWeight: "500",
    color: "#737373",
  },
  signupLink: {
    fontSize: hp(1.8),
    fontWeight: "700",
    color: "#6366F1",
  },
});

export default Login;
