import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ViewStyle,
} from "react-native";
import Typography from "./typography";
import Icon from "./icon";
import { colors, DIMENSIONS } from "../utils/theme";

type CustomTextInputProps = {
  value: string | null | undefined;
  placeholder: string;
  onChangeText: (text: string) => void;
  setContainerHeight?: (height: number) => void;
  textColor?: string;
  borderColor?: string;
  grow?: boolean;
  multiline?: boolean;
  secure?: boolean;
  keyboardType?: string;
  backgroundColor?: string;
  scrollEnabled?: boolean;
  borderRadius?: number;
  width?: string | number | any;
  height?: string | number | any;
  maxHeight?: number | string;
  minHeight?: number | string;
  errorText?: string;
  icon?: any;
  border?: boolean;
  ref?: any;
  onFocus?: () => void;
  position?: "top" | "middle";
  style?:ViewStyle;
};

const CTextInput: React.FC<CustomTextInputProps> = ({
  value,
  placeholder,
  onChangeText,
  setContainerHeight,
  textColor = "#000",
  borderColor = "#ffff",
  backgroundColor = "#ffff",
  secure = false,
  grow = false,
  multiline,
  scrollEnabled = false,
  keyboardType = "default",
  borderRadius = 5,
  border = true,
  width = "100%",
  height = 50,
  minHeight = 50,
  maxHeight,
  icon,
  onFocus,
  ref,
  errorText = "",
  position = "middle",
  style
}) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View>
      <View
        style={[
          styles.inputwrapper,
          {
            backgroundColor: backgroundColor,
            width: width,
            borderRadius: borderRadius,
            height: height,
            maxHeight: maxHeight,
            minHeight: minHeight,
          },
        ]}
      >
        {icon ? (
          <View style={{ padding: 10, borderRadius: borderRadius }}>
            <Icon name={icon} size={20} color={colors.grey} />
          </View>
        ) : null}
        <TextInput
          style={[
            styles.input,
            {
              textAlignVertical: position, // This makes text start from the top
              color: textColor,
              borderColor,
              borderRadius,
              width,
              height,
              backgroundColor,
              borderWidth: border ? 1 : 0,
            },
          ]}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          ref={ref}
          multiline={multiline} // Ensure multiline is enabled
          onFocus={onFocus}
          keyboardType={keyboardType}
          secureTextEntry={showPassword && secure}
          onChangeText={onChangeText}
          scrollEnabled={scrollEnabled}
        />
        {secure && value != "" && (
          <TouchableOpacity
            style={styles.inputIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Typography size={12} color="textSecondary">
              {showPassword ? "Show" : "Hide"}
            </Typography>
          </TouchableOpacity>
        )}
      </View>
      {errorText ? (
        <Typography color="error" style={styles.errorText}>
          {errorText}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
  },
  inputwrapper: {
    flexDirection: "row",
    // alignItems: "center",
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
  },
  inputIcon: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
});

export default CTextInput;
