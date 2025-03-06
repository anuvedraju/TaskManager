import axios from "axios";
import API from "./axiosconfig";
import { Tasks, User } from "../types/types";

interface GetUserTaskGroupsResponse {
  tasks: Tasks[];
}

// Fetch user's task groups
export const fetchUserTaskGroups = async (
  userId: string | null
): Promise<GetUserTaskGroupsResponse> => {
  try {
    const response = await API.get<GetUserTaskGroupsResponse>(
      `/api/task/gettasks/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user task groups:", error);
    throw error;
  }
};

type UpdateTaskGroupRequest = {
  title: string;
  description: string;
};

type UpdateTaskGroupResponse = {
  message: string;
  task: Tasks;
};

// Update a task group
export const updateTaskGroup = async (
  action: string,
  data: UpdateTaskGroupRequest,
  taskId: string
): Promise<UpdateTaskGroupResponse> => {
  try {
    const response = await API.post<UpdateTaskGroupResponse>(
      `/api/task/update/${action}/${taskId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task group:", error);
    throw new Error("Failed to update task. Please check your request.");
  }
};

interface SearchUserResponse {
  users: User[];
}

// Search tasks by name
export const searchTaskByTaskname = async (
  userId: string,
  taskName: string
): Promise<{ tasks: Tasks[] }> => {

  console.log(userId,taskName,"jdhcvhwdevch")
  try {
    // Fix: Send userId and taskName as route parameters, not query parameters
    const response = await API.get<{ tasks: Tasks[] }>(`/api/task/search/${userId}/${taskName}`);
    return response.data;
  } catch (error) {
    console.error("Error searching for tasks:", error);
    throw new Error("Failed to fetch tasks. Please check the task name.");
  }
};

type CreateTaskGroupRequest = {
  title: string;
  description: string;
  creatorId: string;
  type: string;
};

type CreateTaskGroupResponse = {
  message: string;
  task: Tasks;
};

// Create a new task group
export const createNewTaskGroup = async (
  data: CreateTaskGroupRequest
): Promise<CreateTaskGroupResponse> => {
  try {
    const response = await API.post<CreateTaskGroupResponse>(
      "/api/task/create",
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating task group:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while creating the task group."
    );
  }
};

type DeleteTaskGroupRequest = {
  taskIds: string[];
};

type DeleteTaskGroupResponse = {
  message: string;
  deletedTaskIds: string[];
};

// Delete tasks
export const deleteTasks = async (
  data: DeleteTaskGroupRequest
): Promise<DeleteTaskGroupResponse> => {
  try {
    const response = await API.delete<DeleteTaskGroupResponse>(
      "/api/task/delete",
      { data } // <-- Axios DELETE requires data to be inside config object
    );
    return response.data;
  } catch (error: any) {
    console.error("Error deleting task group:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred while deleting tasks."
    );
  }
};
