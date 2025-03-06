import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { searchTaskByTaskname } from "@/api/tasks"; // Create this API function
import Typography from "@/components/typography";
import CustomCheckBox from "@/components/check_box";
import Icon from "@/components/icon";
import { colors } from "@/utils/theme";
import Header from "@/components/header";
import { useTheme } from "@/components/themecontext";

export default function SearchPage() {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const theme = useTheme().theme;

  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTasks = useCallback(
    debounce(async (query) => {
      if (!query.trim() || !user?.userId) {
        setTasks([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await searchTaskByTaskname(user.userId, query);
        if (response?.tasks) {
          setTasks(response.tasks);
        } else {
          setTasks([]);
        }
      } catch (err) {
        setError("Error fetching search results");
      }
      setLoading(false);
    }, 500),
    [user?.userId]
  );

  useEffect(() => {
    searchTasks(searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleTaskOnPress = (item) => {
    router.push({
      pathname: "/protected/task-edit",
      params: { item: JSON.stringify(item) },
    });
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleTaskOnPress(item)}
      style={[styles.taskItem, { backgroundColor: colors.secondarylight }]}
    >
      <View>
        <Typography color="black" weight="BLD" size={18}>
          {item.title}
        </Typography>
        <Typography>{item.description}</Typography>

        {/* <CustomCheckBox value={false} onValueChange={() => {}} style={styles.checkBox} /> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Header title="Search Tasks" backgroundcolorx="primary" labelColor="white" backbutton />

      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.colors.white },
        ]}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          placeholderTextColor={colors.grey}
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <Icon name="search" color={colors.primary} size={20} />
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={styles.loader}
        />
      )}


      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        renderItem={renderTaskItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !loading && searchQuery ? (
            <Text style={styles.noResults}>No tasks found</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
    padding:10
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: colors.black,
  },
  loader: { marginVertical: 10 },
  errorText: { color: "red", textAlign: "center", marginVertical: 10 },
  noResults: { textAlign: "center", marginVertical: 20, color: colors.grey },
  list: { paddingBottom: 20,padding:10 },
  taskItem: {
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.secondarylight,
  },
  checkBox: {
    position: "absolute",
    right: 0,
    top: 10,
  },
});
