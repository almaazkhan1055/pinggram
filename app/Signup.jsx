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
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Signup from "../assets/images/login.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import CustomKeyboardView from "../components/customKeyboardView";
import { useAuth } from "../context/authContext";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [profile, setProfile] = useState("");

  const { register } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password || !userName || !profile) {
      Alert.alert("Signup", "Please fill all the fields!");
      return;
    }

    setLoading(true);
    const response = await register(email, password, userName, profile);
    setLoading(false);

    if (!response.success) {
      Alert.alert("Signup", response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Animatable.View animation="slideInDown" style={styles.imageContainer}>
          <Image
            style={styles.signupImage}
            resizeMode="contain"
            source={Signup}
          />
        </Animatable.View>

        <View style={styles.formContainer}>
          <Animatable.Text animation="slideInRight" style={styles.signupText}>
            Sign up
          </Animatable.Text>

          <View style={styles.formFields}>
            <AnimatedInput
              icon="user"
              placeholder="Username"
              value={userName}
              onChangeText={setUserName}
            />
            <AnimatedInput
              icon="mail"
              placeholder="Enter address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <AnimatedInput
              icon="lock-outline"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              iconFamily={MaterialIcons}
            />
            <AnimatedInput
              icon="image"
              placeholder="Profile url"
              value={profile}
              onChangeText={setProfile}
            />

            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </View>

          <View>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Loading size={hp(6.5)} />
              </View>
            ) : (
              <Animatable.View animation="slideInLeft">
                <TouchableOpacity
                  onPress={handleSignup}
                  style={styles.signupButton}
                >
                  <Text style={styles.signupButtonText}>Create account</Text>
                </TouchableOpacity>
              </Animatable.View>
            )}
          </View>

          <Animatable.View animation="slideInUp" style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Already have an account?</Text>
            <Pressable onPress={() => router.push("/Login")}>
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </Animatable.View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

const AnimatedInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  iconFamily = Feather,
}) => (
  <Animatable.View animation="slideInUp" style={styles.inputContainer}>
    {React.createElement(iconFamily, {
      name: icon,
      size: hp(2.7),
      color: "gray",
    })}
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="gray"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  </Animatable.View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    paddingTop: hp(5),
    paddingHorizontal: wp(5),
  },
  signupImage: {
    height: hp(25),
  },
  formContainer: {
    paddingHorizontal: 20,
    gap: 30,
  },
  signupText: {
    fontSize: hp(5),
    fontWeight: "600",
    textAlign: "center",
    color: "black",
  },
  formFields: {
    gap: 16,
  },
  inputContainer: {
    height: hp(7),
    flexDirection: "row",
    paddingHorizontal: 10,
    gap: 16,
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#f3f4f6",
  },
  input: {
    fontSize: hp(2),
    flex: 1,
    fontWeight: "400",
    color: "#404040",
  },
  forgotPasswordText: {
    textAlign: "right",
    fontWeight: "700",
    color: "#737373",
    fontSize: hp(1.8),
  },
  loadingContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupButton: {
    backgroundColor: "#6366F1",
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: 15,
  },
  signupButtonText: {
    fontSize: hp(2.7),
    color: "white",
    fontWeight: "700",
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginPromptText: {
    fontSize: hp(1.8),
    fontWeight: "500",
    color: "#737373",
  },
  loginText: {
    fontSize: hp(1.8),
    fontWeight: "700",
    color: "#6366F1",
  },
});

export default SignUp;
