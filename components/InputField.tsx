import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";

import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          <View style={[styles.inputContainer, containerStyle]}>
            {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
            <TextInput
              style={[styles.textInput, inputStyle]}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginVertical: 8,
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontFamily: "JakartaSemiBold",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5", // Assuming this is "bg-neutral-100"
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    paddingLeft: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  textInput: {
    flex: 1,
    padding: 16,
    fontSize: 15,
    fontFamily: "JakartaSemiBold",
    textAlign: "left",
    borderRadius: 25,
  },
});

export default InputField;
