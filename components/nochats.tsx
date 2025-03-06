import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "./icon";
import Typography from "./typography";
import { colors, DIMENSIONS } from "../utils/theme";
import { useNavigation } from "@react-navigation/native";

export const NoChat = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.emptyContainer}>
      <Icon name="addmember" size={100} color={colors.grey2} />
      <Typography size={20} color="grey2" weight="SG">
        You have no chats available,search for friends here and start a new chat!!
      </Typography>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddMembers",[])}
      >
        <Typography color="white" weight="SG">
          search
        </Typography>   
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: DIMENSIONS.hp(60),
  },
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 40,
  },
});
