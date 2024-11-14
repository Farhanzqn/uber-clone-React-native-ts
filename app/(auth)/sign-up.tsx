import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View, StyleSheet } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constant";
import OAuth from "@/components/OAuth";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    // Implement sign-up logic here
  };

  const onGoogleSignInPress = async () => {
    // Implement Google sign-in logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerImageContainer}>
          <Image source={images.signUpCar} style={styles.headerImage} />
          <Text style={styles.headerText}>Create Your Account</Text>
        </View>
        <View style={styles.formContainer}>
          <InputField
            label="Name"
            placeholder="Enter name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            style={[styles.signUpButton, styles.buttonShadow]}
          />
          <Text style={styles.orText}>Or</Text>

          {/* Button Google Sign In */}
          <CustomButton
            title="Log In with Google"
            onPress={onGoogleSignInPress}
            style={[styles.googleButton, styles.buttonShadow]}
            IconLeft={() => (
              <Image
                source={icons.google}
                style={styles.googleIcon}
                resizeMode="contain"
              />
            )}
          />

          <Link href="/sign-in" style={styles.signInLink}>
            Already have an account?{" "}
            <Text style={styles.signInText}>Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  headerImageContainer: {
    position: "relative",
    width: "100%",
    height: 250,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerText: {
    fontSize: 24,
    color: "black",
    fontFamily: "JakartaSemiBold",
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  formContainer: {
    padding: 20,
  },
  signUpButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 18,
    textAlign: "center",
    color: "#B0B0B0",
    marginVertical: 16,
  },
  googleButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  googleButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  signInLink: {
    fontSize: 14,
    textAlign: "center",
    color: "#B0B0B0",
    marginTop: 20,
  },
  signInText: {
    color: "#007AFF",
  },
  buttonShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // for Android shadow
  },
});

export default SignUp;
