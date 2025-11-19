/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import app_axios from "@/lib/axios";

interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
interface LoginData {
  email: string;
  password: string;
}



export const loginUser = async (data: LoginData) => {
  try {
    console.log("user data", data);
    const response = await app_axios.post("/auth/login/", data);
    console.log("response login user", response.data);
    console.log("response login user", response);

    // const response = await api.post('/users/login/', credentials);

    if (response.data?.access && response.data?.refresh) {
      // Store tokens

      console.log(" here store data");
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      if (typeof window !== "undefined") {
        if (response.data?.access && response.data?.refresh) {
          console.log("store data if blcok");

          localStorage.setItem("accessToken", response.data.access);
          localStorage.setItem("refreshToken", response.data.refresh);
        }
      } else {
        console.warn("localStorage not available (SSR)");
      }
    }

    return {
      success: true,
      data: response.data,
      message: "Login successful!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Something went wrong during sign up!",
      error: error?.response?.data,
      status: error?.response?.status,
    };
  }
};

export interface AuthResponse {
  success: boolean;
  data?: {
    refresh: string;
    access: string;
    user?: any;
  };
  message: string;
  status?: number;
}
// Logout function
export const logoutUser = async (): Promise<AuthResponse> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    // If you have a logout endpoint, call it
    if (refreshToken) {
      await app_axios.post("/users/logout/", {
        refresh: refreshToken,
      });
    }

    // Clear local storage
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    // localStorage.removeItem('user');
    // localStorage.removeItem('rememberMe');

    return {
      success: true,
      message: "Logged out successfully!",
    };
  } catch (error: any) {
    // Even if API call fails, clear local storage
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    // localStorage.removeItem('user');
    // localStorage.removeItem('rememberMe');

    return {
      success: true,
      message: "Logged out successfully!",
    };
  }
};
