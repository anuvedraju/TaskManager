import { useNavigation } from "@react-navigation/native";

// api/auth.ts
import axios, { AxiosResponse } from "axios";

import API from "./axiosconfig";
import { User } from "../types/types";
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface LoginParams {
  email: string;
  password: string;
}

// Define your login response structure if needed
export interface LoginResponse {
  accessToken: string;
  user: any; // or define a proper type for user
}

interface SignupResponse {
  message: string;
}

export interface SignupData {
  username: string;
  password: string;
  email: string;
}

export interface UpdateData {
  type: string;
  value: any;
  userId: any;
}

// The client API to sign up a user
export const signupUser = async (
  signupData: SignupData
): Promise<SignupResponse | null> => {
  try {
    const response: AxiosResponse<SignupResponse> = await API.post(
      "/api/auth/signup",
      signupData
    );

    if (response.status === 201) {
      // Success response, user is created
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return null;
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse | null> => {
  try {
    const response: AxiosResponse<LoginResponse> = await API.post(
      "/api/auth/login",
      {
        email,
        password,
      }
    );

    if (response.status === 200) {
      console.log("Login successful. Tokens stored successfully.");

      return response.data; // Return the response data with tokens and user
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

export const logoutUser = async () => {
  console.log("working");
  try {
    // Clear the tokens from store
    await AsyncStorage.removeItem("access_token");

    router.replace("/auth/login");
  } catch (error) {
    console.error("Error logging out the user:", error);
  }
};

export const updateuserprofiledetails = async (data: {
  type: string;
  value: { email: string; username: string; profilePicture: string };
  userId: string;
}): Promise<any | null> => {
  try {
    const response: AxiosResponse<any> = await API.post(
      "/api/auth/updateuserprofiledetails",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      // Handle success response
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      return null;
    }
  } catch (error) {
    console.error("Error during updateuserprofiledetails:", error);
    console.log(data, process.env.BASE_URL);
    return null;
  }
};
