import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View, StyleSheet } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons, images } from "@/constant";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "Pending",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "Success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification Failed",
          state: "Failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "Failed",
      });
    }
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
        <ReactNativeModal
          isVisible={verification.state == "Pending"}
          onModalHide={() =>
            setVerification({
              ...verification,
              state: "Success",
            })
          }
        >
          <View style={styles.reactNativeModalContainer}>
            <Text style={styles.verificationText}>Verification</Text>
            <Text style={styles.messageText}>
              We've sent a verification code to {form.email}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({
                  ...verification,
                  code,
                })
              }
            />
            {verification.error && (
              <Text style={styles.errorText}>{verification.error}</Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={verification.state == "Success"}>
          <View style={styles.reactNativeModalContainer}>
            <Image source={images.check} style={styles.imageReactNativeModal} />
            <Text style={styles.title}>Verified</Text>
            <Text style={styles.subtitle}>
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse Home"
              onPress={() => router.replace("../(root)(tabs)/home")}
              style={styles.button}
            />
          </View>
        </ReactNativeModal>
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
  reactNativeModalContainer: {
    backgroundColor: "white", // bg-white
    paddingHorizontal: 28, // px-7 (7 * 4 = 28)
    paddingVertical: 36, // py-9 (9 * 4 = 36)
    borderRadius: 16, // rounded-2xl
    minHeight: 300, // min-h-[300px]
    justifyContent: "center",
  },
  imageReactNativeModal: {
    width: 110, // w-[110px]
    height: 110, // h-[110px]
    alignSelf: "center", // mx-auto
    marginVertical: 20,
  },
  title: {
    fontSize: 24, // text-3xl = 24px
    fontFamily: "JakartaBold", // font-JakartaBold
    textAlign: "center", // text-center
    marginBottom: 8, // Tambahkan sedikit spasi antara teks dan subtitle
  },
  subtitle: {
    fontSize: 16, // text-base = 16px
    color: "#9CA3AF", // text-gray-400 = hex dari Tailwind Gray 400
    fontFamily: "Jakarta", // font-Jakarta
    textAlign: "center", // text-center
  },
  button: {
    marginTop: 20, // mt-5 = 20px
  },
  verificationText: {
    fontSize: 24, // text-2xl = 24px
    fontFamily: "JakartaExtraBold", // font-JakartaExtraBold
    marginBottom: 8, // mb-2 = 8px
  },
  messageText: {
    fontFamily: "Jakarta", // font-Jakarta
    marginBottom: 20, // mb-5 = 20px
  },
  errorText: {
    color: "#EF4444", // text-red-500 = hex Tailwind Red 500
    fontSize: 14, // text-sm = 14px
    marginTop: 4, // mt-1 = 4px
  },
});

export default SignUp;
