import { Alert, Image, Text, View, StyleSheet } from "react-native";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constant";

const OAuth = () => {
  const handleGoogleSignIn = async () => {
    // Implement Google sign-in logic here
  };

  return (
    <View>
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or</Text>
        <View style={styles.line} />
      </View>

      <CustomButton
        title="Log In with Google"
        style={styles.googleButton}
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            style={styles.googleIcon}
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0", // Assuming this is "bg-general-100"
  },
  orText: {
    fontSize: 18,
    marginHorizontal: 12,
  },
  googleButton: {
    marginTop: 20,
    width: "100%",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 8,
  },
});

export default OAuth;
