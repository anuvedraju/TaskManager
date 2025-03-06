import React from 'react';
import { Image, StyleSheet, ImageStyle } from 'react-native';
import { icons } from '../utils/icon';

interface IconProps {
  name: string; // Image source (local or remote)
  size?: number; // Size of the icon (applies to both width and height)
  color?: string; // Tint color for the icon
  style?: ImageStyle; // Additional custom styles
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color, style }) => {
  return (
    <Image
      source={icons[name]}
      style={[
        styles.icon,
        { width: size, height: size },
        color ? { tintColor: color } : {}, // Apply tint color if provided
        style,
      ]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default Icon;
