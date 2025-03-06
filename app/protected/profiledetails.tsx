import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTheme } from "../../components/themecontext";
import CTextInput from "../../components/textinput";
import { colors } from "../../utils/theme";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/avathar";
import { avatharColorMap, generateUniqueId } from "../../utils/functions";
import Typography from "../../components/typography";
import { UpdateData, updateuserprofiledetails } from "../../api/authentication";

const ProfileDetails = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(user.profilePicture);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  // UseCallback for optimizing the pickImage function


  console.log("username",user.username)
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={()=>{}}>
          <Avatar
            name={username}
            diameter={6}
            image={avatar}
            style={[styles.avatar, { backgroundColor: avatharColorMap[2] }]}
          />
        </TouchableOpacity>
        <Typography style={styles.editAvatarText}>Tap to change avatar</Typography>
      </View>

      <View style={styles.inputContainer}>
        <Typography style={styles.label} weight="SG">Username</Typography>
        <CTextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          backgroundColor={theme.colors.white}
          border={false}
          textColor={theme.colors.black}
        />
      </View>

      <View style={styles.inputContainer}>
        <Typography style={styles.label} weight="SG">Email</Typography>
        <CTextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          backgroundColor={theme.colors.white}
          border={false}
          textColor={theme.colors.black}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={()=>{}}>
        <Typography style={styles.saveButtonText}>Save</Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarText: {
    marginTop: 10,
    color: colors.primary,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileDetails;
