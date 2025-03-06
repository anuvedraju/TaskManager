import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { deleteTasks, fetchUserTaskGroups, updateTaskGroup } from "@/api/tasks";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Typography from "@/components/typography";
import Icon from "@/components/icon";
import { colors } from "@/utils/theme";
import Header from "@/components/header";
import { useTheme } from "@/components/themecontext";
import {
  setTasksFromAPI,
  deleteTask,
  updateTask,
} from "@/redux/slices/taskSlice";
import CustomCheckBox from "@/components/check_box";

export default function TaskListScreen() {
  const router = useRouter();
  const user = useSelector((state: any) => state.auth.user, shallowEqual);
  const tasksFromStore = useSelector((state: any) => state.tasks?.tasks || []);
  const tasks = useMemo(() => [...tasksFromStore].reverse(), [tasksFromStore]);
  const dispatch = useDispatch();
  const theme = useTheme().theme;
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const userIdRef = useRef(user?.userId);

  // useEffect(() => {
  //   if (userIdRef.current !== user?.userId && user?.userId) {
  //     console.log("Fetching tasks for user:", user?.userId);
  //     getTasks(user.userId);
  //     userIdRef.current = user?.userId; // Store the last userId
  //   }
  // }, [user?.userId]);

  useEffect(() => {
    getTasks(user?.userId);
  },[]);

  const getTasks = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      const response = await fetchUserTaskGroups(userId);
      if (response?.tasks) {
        dispatch(setTasksFromAPI(response.tasks));
        setLoading(false);
      } else {
        console.warn("Warning: No tasks found.");
        setLoading(false);
      }
      setSelectedTasks([]); // Reset selection on task update
    } catch (error) {
      console.error("Error getting user tasks:", error);
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (user?.userId) await getTasks(user.userId);
    setRefreshing(false);
  }, [getTasks, user?.userId]);

  const handleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleTaskCheckboxChange = async (task: any) => {
    try {
      setCompletedTasks((prev) =>
        prev.includes(task.taskId)
          ? prev.filter((id) => id !== task.taskId)
          : [...prev, task.taskId]
      );
      const updatedTask = await updateTaskGroup("complete", task, task.taskId);
      if (updatedTask?.task) {
        dispatch(updateTask(updatedTask.task));
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTasks = async () => {
    try {
      if (selectedTasks.length === 0) return;
      const response = await deleteTasks({ taskIds: selectedTasks });

      if (response?.deletedTaskIds) {
        response.deletedTaskIds.forEach((taskId) =>
          dispatch(deleteTask(taskId))
        );
        setSelectedTasks([]);
      }
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };

  const handleTaskOnPress = (item) => {
    if (selectedTasks.includes(item.taskId)) {
      handleTaskSelection(item.taskId);
    } else {
      router.push({
        pathname: "/protected/task-edit",
        params: { item: JSON.stringify(item) },
      });
    }
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      onPress={
        item.type != "completed" ? () => handleTaskOnPress(item) : () => {}
      }
      onLongPress={() => handleTaskSelection(item.taskId)}
      style={[
        styles.tasks,
        selectedTasks.includes(item.taskId) && styles.selectedTask,
        {
          backgroundColor:
            item.type === "completed"
              ? theme.colors.white
              : colors.secondarylight,
        },
      ]}
    >
      <View>
        <Typography color="black" weight="BLD" size={15}>
          {item.title}
        </Typography>
        <Typography>{item.description}</Typography>

        <CustomCheckBox
          value={completedTasks.includes(item.taskId)}
          onValueChange={
            item.type === "original"
              ? () => handleTaskCheckboxChange(item)
              : () => {}
          }
          tintColors={{
            true:
              item.type === "completed" ? theme.colors.white : colors.secondary,
            false:
              item.type === "completed" ? theme.colors.white : colors.secondary,
          }}
          style={styles.checkBox}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header
        title="Tasks"
        backgroundcolorx="primary"
        labelColor="white"
        buttons={[
          {
            icon: "search",
            onPress: () => router.push(`/protected/searchtasks`),
          },
          selectedTasks.length > 0
            ? { icon: "dump", onPress: handleDeleteTasks }
            : {
                icon: "options",
                onPress: () => router.push(`/protected/slidemenu`),
              },
        ]}
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.taskId}
        renderItem={renderTaskItem}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.noTask}>
              <Typography
                size={20}
                style={{ marginBottom: 20 }}
                weight="SG"
                color={"grey"}
              >
                You have no tasks to do!!
              </Typography>
              <Icon name="emoji" color="grey" size={50} />
            </View>
          ) : (
            <ActivityIndicator />
          )
        }
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push(`/protected/task-edit?id=${[]}`)}
      >
        <Icon name="plus" color={colors.white} size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  list: { width: "100%", padding: 10 },
  tasks: {
    marginVertical: 2,
    padding: 10,
    borderRadius: 10,
  },
  selectedTask: {
    backgroundColor: colors.secondarylight,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  checkBox: {
    marginRight: 2,
    borderRadius: 5,
    position: "absolute",
    right: 0,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noTask: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40%",
    padding: 10,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
  },
});
