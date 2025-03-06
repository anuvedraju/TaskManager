import React from "react";
import { View, StyleSheet, StyleProp, ImageStyle, Image } from "react-native";

import Typography from "./typography";
import { colors, DIMENSIONS } from "../utils/theme";
import LazyImage from "./lazyimage";

type Props = {
  name: string;
  image?: any; // Supports both `require` and remote URL as `string`
  diameter?: number;
  style?: StyleProp<ImageStyle>;
};

function Avatar({ image, name, diameter = 4, style }: Props): JSX.Element {
  const block = {
    height: DIMENSIONS.hp(diameter),
    width: DIMENSIONS.hp(diameter),
    borderRadius: DIMENSIONS.hp(diameter / 2),
  };

  const avatar = (
    <View style={[styles.avatar, block, style]}>
      <Typography
        color="white"
        size={10 * (diameter / 3)}
        weight="SG"
        style={styles.name}
      >
        {name?.[0]}
      </Typography>
    </View>
  );

  // Handle both local and remote images
  if (image) {
    return (
      <LazyImage
        source={typeof image === "string" ? { uri: image } : image}
        style={[styles.avatar, block, style]}
        errorFallback={avatar}
      />
    );
  }

  return avatar;
}

const styles = StyleSheet.create({
  avatar: {
    marginRight: DIMENSIONS.wp(3),
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    borderColor: colors.primary,
  },
  name: {
    textTransform: "uppercase",
    fontFamily: "SourGummy-ExtraBold",
  },
});

export default Avatar;
