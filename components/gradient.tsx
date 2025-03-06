import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientText = ({ text, gradientColors, style }) => {
  return (
    <View style={[styles.textWrapper, style]}>
      <LinearGradient colors={gradientColors} style={styles.gradient}>
        <Text style={[styles.text, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
      <Text style={styles.maskedText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  maskedText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'transparent',
    includeFontPadding: false,
  },
});

export default GradientText;
