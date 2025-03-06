import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@/components/typography";
import CTextInput from "@/components/textinput";
import { useTheme } from "@/components/themecontext";
import Header from "@/components/header";
import CButton from "@/components/button";
import { createNewTaskGroup, updateTaskGroup } from "@/api/tasks";
import { addTask, updateTask } from "@/redux/slices/taskSlice";

export default function TaskEditScreen() {
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(item as string) : null;
  const { user } = useSelector((state: any) => state.auth);
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    title: parsedItem?.title || "",
    description: parsedItem?.description || "",
  });

  const handleTasksUpdate = async () => {
    try {
      const data = {
        title: task.title,
        description: task.description,
        ...(parsedItem ? {} : { creatorId: user.userId, type: "original" }),
      };

      const response = parsedItem
        ? await updateTaskGroup("update", data, parsedItem.taskId)
        : await createNewTaskGroup(data);

      if (response) {
        dispatch(
          parsedItem ? updateTask(response.task) : addTask(response.task)
        );

        router.push("/protected/tasks");
      }
    } catch (error) {
      console.error("Task update error:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header
        title={parsedItem ? "Edit Task" : "Create New Task"}
        labelColor="white"
        backbutton
        backgroundcolorx="primary"
      />

      <View style={styles.textInputContainer}>
        <CTextInput
          value={task.title}
          placeholder="Title"
          onChangeText={(text) => setTask((prev) => ({ ...prev, title: text }))}
          textColor={theme.colors.black}
          border={false}
          backgroundColor={theme.colors.white}
        />
        <CTextInput
          value={task.description}
          placeholder="Description"
          onChangeText={(text) =>
            setTask((prev) => ({ ...prev, description: text }))
          }
          textColor={theme.colors.black}
          backgroundColor={theme.colors.white}
          grow
          multiline
          height={200}
          minHeight={200}
          position="top"
          border={false}
        />
        <CButton
          label={parsedItem ? "Save Task" : "Create Task"}
          onPress={handleTasksUpdate}
          labelColor="black"
          style={styles.button}
          disabled={
            parsedItem
              ? parsedItem.title === task.title &&
                parsedItem.description === task.description // Disable if no changes
              : task.title.trim() === "" // Disable if title is empty
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  textInputContainer: {
    gap: 10,
    alignItems: "center",
    padding: 10,
  },
  button: {
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
});
