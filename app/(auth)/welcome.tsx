import { onboarding } from "@/constant";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import CustomButton from "@/components/CustomButton";

const OnBoarding = () => {
  const swiperRef = useRef<Swiper | null>(null); // TypeScript update for nullability
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity
        onPress={() => {
          router.replace("../(auth)/sign-up");
        }}
        style={stylesToucheble.container}
      >
        <Text style={stylesText.text}>Skip</Text>
      </TouchableOpacity>

      {/* Swiper Component */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={stylesDot.dot} />}
        activeDot={
          <View style={[stylesDot.dot, { backgroundColor: "#0286FF" }]} />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} style={styles.slideContent}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-10 mb-5"
      />
    </SafeAreaView>
  );
};

const stylesDot = StyleSheet.create({
  dot: {
    width: 32,
    height: 4,
    marginHorizontal: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
  },
});

const stylesText = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 16,
    fontFamily: "Jakarta-Bold",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  slideContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: -230,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 15,
  },
  titleText: {
    color: "black",
    fontSize: 32, // Terjemahan dari "text-3xl" (~24px)
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
  },
  description: {
    fontSize: 18, // Terjemahan dari "text-md"
    fontFamily: "Jakarta-SemiBold",
    color: "#858585",
    textAlign: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
});

const stylesToucheble = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    marginBottom: 4,
  },
});

export default OnBoarding;
