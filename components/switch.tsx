import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import Typography from "./typography";
import { colors } from "../utils/theme";
import Icon from "./icon";

interface SwitchButtonProps {
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
  onText0?: string;
  offText0?: string;
  onText1?: string;
  offText1?: string;
  activeColor?: string;
  inactiveColor?: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  isEnabled,
  onToggle,
  onText0 = "On",
  offText0 = "Off",
  onText1 = "On",
  offText1 = "Off",
  activeColor = "#cccc",
  inactiveColor = "#cccc",
}) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Trigger the rotation animation when isEnabled changes
    Animated.timing(rotation, {
      toValue: isEnabled ? 1 : 0, // 1 for 360° and 0 for 0°
      duration: 500, // Duration of the animation
      useNativeDriver: true, // Enable native driver for better performance
    }).start();
  }, [isEnabled]);

  // Interpolating the rotation value to degrees
  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isEnabled ? activeColor : inactiveColor },
      ]}
      activeOpacity={0.7}
      onPress={() => onToggle(!isEnabled)}
    >
      <Animated.View
        style={[
          styles.circle,
          isEnabled ? styles.circleActive : styles.circleInactive,
          { transform: [{ rotate: rotateInterpolation }] },
        ]}
      >
        <Icon
          name={isEnabled ? "moon" : "sun"}
          color={isEnabled ? colors.black : colors.accent}
        />
      </Animated.View>
      <Typography
        style={[
          styles.label,
          isEnabled ? styles.labelActive : styles.labelInactive,
        ]}
      >
        <View>
          <Typography
            size={10}
            color={isEnabled ? "white" : "accent"}
            weight="BLD"
          >
            {isEnabled ? onText0 : offText0}
          </Typography>
          <Typography
            size={10}
            color={isEnabled ? "black" : "slate"}
            weight="BLD"
          >
            {isEnabled ? onText1 : offText1}
          </Typography>
        </View>
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 40,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    shadowColor: "#0000",
    alignItems: "center",
    justifyContent: "center",
  },
  circleActive: {
    backgroundColor: "#fff",
    right: 0,
    alignSelf: "flex-end",
  },
  circleInactive: {
    backgroundColor: "#fff",
    left: 0,
    alignSelf: "flex-start",
  },
  label: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
  },
  labelActive: {
    textAlign: "left",
    left: "20%",
  },
  labelInactive: {
    textAlign: "right",
    right: "20%",
  },
});

export default SwitchButton;
