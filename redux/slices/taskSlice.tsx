import { Tasks } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  tasks: Tasks[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Tasks>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Tasks>) => {
      const index = state.tasks.findIndex(
        (task) => task.taskId === action.payload.taskId
      );
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload }; // Ensure proper merging
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.taskId !== action.payload);
    },
    setTasksFromAPI: (state, action: PayloadAction<Tasks[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, setTasksFromAPI } =
  taskSlice.actions;
export default taskSlice.reducer;