import React from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle } from "react-native";
import Icon from "./icon";
import { colors } from "@/utils/theme";

interface CustomCheckBoxProps {
  value: boolean;
  onValueChange: () => void;
  tintColors: { true: string; false: string };
  style?: ViewStyle;
}

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  value,
  onValueChange,
  tintColors,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onValueChange}
      style={[styles.checkboxContainer, style]}
    >
      <View
        style={[
          styles.checkbox,
          value && { borderColor: tintColors.true },
          !value && { borderColor: tintColors.false },
          value && styles.checkedCheckbox,
        ]}
      >
        {value && <Icon name="tick" color={colors.primary} size={14} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkedCheckbox: {
    backgroundColor: colors.secondarylight,
  },
});

export default CustomCheckBox;
