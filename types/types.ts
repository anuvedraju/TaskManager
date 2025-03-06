export interface Tasks {
  type?: string;
  title: string | null;
  description: User[];
  _id: string;
  taskId: string;
  createdAt: string;
  __v: number;
}

// Type for User
export interface User {
  _id?: string;
  userId: string; // UUID for external identification (matches userId in UserState)
  profilePicture?: string;
  username?: string; // Username
  email?: string; // Added for consistency with UserState
}
