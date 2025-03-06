import React, { useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  FlatList,
  Platform,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Icon from "./icon";
import Typography from "./typography";
import { colors } from "../utils/theme";
import { useTheme } from "./themecontext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";

interface CustomModalProps {
  contents: any;
  visible: boolean;
  width?: number;
  height?: number;
  icon?: string; // give icon as string,it is optional
  title: string;
  description: string;
  onClose?: () => void; //Optional
  onConfirm?: () => void; // Optional confirm action
  confirmText?: string; // Confirm button text
  cancelText?: string; // Cancel button text
  confirmButtonColor?: string; // Custom confirm button color
  iconStyle?: ViewStyle;
  titleStyle?: TextStyle;
  onIconPress?: () => void;
  backgroundColor: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  contents,
  visible,
  width = 300,
  height = 300,
  icon,
  title,
  description,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonColor = colors.primary, // Default to primary color
  iconStyle = {},
  titleStyle = {},
  onIconPress,
  backgroundColor = "white",
}) => {
  const theme = useTheme().theme;

  return (
    <View style={styles.modalOverlay}>
      <View
        style={[
          styles.modalContainer,
          {
            width,
            height: icon ? 300 : height,
            backgroundColor: backgroundColor,
          },
        ]}
      >
        {/* {icon && <Icon name={icon} width={10} height={10} style={[styles.icon, iconStyle]}   />} */}
        {icon && (
          <TouchableOpacity
            onPress={onIconPress}
            disabled={!onIconPress} // Disable touch if no handler is provided
            style={[styles.icon, iconStyle]}
          >
            <Icon
              name={icon}
              width={10}
              height={10}
              styles={[styles.icon, iconStyle]}
            />
          </TouchableOpacity>
        )}
        <Typography
          size={20}
          textColor="primarygrey"
          style={[styles.modalTitle, titleStyle]}
        >
          {title}
        </Typography>
        <Typography size={12} color="secondary" style={styles.modalDescription}>
          {description}
        </Typography>
        {title === "Reactions" && (
          <View
            style={[styles.modalContent, { backgroundColor: backgroundColor }]}
          >
            {/* Reaction List */}
            <FlatList
              data={contents}
              keyExtractor={(item) => item.emoji}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.reactionItem,
                    { backgroundColor: backgroundColor },
                  ]}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography style={{flex:1}} size={20} color="black">
                      {item.emoji}
                    </Typography>
                    <Typography  style={{flex:2}}  color="primary">
                      {item.people.join(", ")}
                    </Typography>
                  </View>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
        <View style={styles.modalActions}>
          {onClose && (
            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
              <Typography size={14} color="secondary" style={styles.buttonText}>
                {cancelText}
              </Typography>
            </TouchableOpacity>
          )}
          {onConfirm && (
            <TouchableOpacity
              style={[
                styles.buttonConfirm,
                { backgroundColor: confirmButtonColor },
              ]}
              onPress={onConfirm}
            >
              <Typography size={14} color="white" style={styles.buttonText}>
                {confirmText}
              </Typography>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    // flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    margin: "50%",

    // position:"absolute"
  },
  modalContainer: {
    backgroundColor: colors.black,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalDescription: {
    // color: colors.grey,
    textAlign: "center",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonClose: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.secondary,
    alignItems: "center",
  },
  buttonConfirm: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
  iconTouchable: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "50%", // Limit modal height for long lists
    alignItems: "center",
  },
  reactionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
  },
  emoji: {
    fontSize: 22,
    marginRight: 10,
  },
  people: {
    fontSize: 16,
    color: "#555",
  },
});

export default CustomModal;
