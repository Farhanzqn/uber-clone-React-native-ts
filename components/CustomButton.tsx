import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]): ViewStyle => {
  switch (variant) {
    case "secondary":
      return styles.bgSecondary;
    case "danger":
      return styles.bgDanger;
    case "success":
      return styles.bgSuccess;
    case "outline":
      return styles.bgOutline;
    default:
      return styles.bgPrimary;
  }
};

const getTextVariantStyle = (
  variant: ButtonProps["textVariant"]
): TextStyle => {
  switch (variant) {
    case "primary":
      return styles.textPrimary;
    case "secondary":
      return styles.textSecondary;
    case "danger":
      return styles.textDanger;
    case "success":
      return styles.textSuccess;
    default:
      return styles.textDefault;
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, getBgVariantStyle(bgVariant)]}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text style={[styles.text, getTextVariantStyle(textVariant)]}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "90%",
    borderRadius: 999,
    padding: 16,
    paddingHorizontal: 16, // Added horizontal padding for left and right
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  bgPrimary: { backgroundColor: "#0286FF" },
  bgSecondary: { backgroundColor: "#A0A0A0" }, // Updated secondary color to a gray
  bgDanger: { backgroundColor: "red" },
  bgSuccess: { backgroundColor: "green" },
  bgOutline: {
    backgroundColor: "transparent",
    borderColor: "#D1D5DB",
    borderWidth: 0.5,
  },
  text: { fontSize: 18, fontWeight: "bold" },
  textPrimary: { color: "black" },
  textSecondary: { color: "#FFFFFF" }, // Updated to white for better readability
  textDanger: { color: "#FFCDD2" },
  textSuccess: { color: "#A5D6A7" },
  textDefault: { color: "white" },
});

export default CustomButton;
