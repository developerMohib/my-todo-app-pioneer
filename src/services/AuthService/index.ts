/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

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

export const signUpUser = async (data: SignUpData) => {
  try {
    const res = await app_axios.post("/users/signup/", data);

    if (res.data?.access && res.data?.refresh) {
      localStorage.setItem('accessToken', res.data.access);
      localStorage.setItem('refreshToken', res.data.refresh);
      
      // Store user data if available
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
    }


    return {
      success: true,
      data: res?.data,
      message: "Signup successful",
    };
  } catch (error: any) {
    const message =
      "Something went wrong during sign up!";

    return {
      success: false,
      message: message,
      error: error?.response?.data,
      status: error?.response?.status,
    };
  }
};

export const loginUser = async (data: LoginData) => {
  try {
    const res = await app_axios.post("/auth/login/", data);
    return {
      success: true,
      data: res.data,
      message: "Login successful!",      
    };
  } catch (error: any) {
    const message =
      "Something went wrong during sign up!";

    return {
      success: false,
      message: message,
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
    const refreshToken = localStorage.getItem('refreshToken');
    
    // If you have a logout endpoint, call it
    if (refreshToken) {
      await app_axios.post("/users/logout/", {
        refresh: refreshToken
      });
    }
    
    // Clear local storage
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    // localStorage.removeItem('user');
    // localStorage.removeItem('rememberMe');
    
    return {
      success: true,
      message: "Logged out successfully!"
    };
  } catch (error: any) {
    // Even if API call fails, clear local storage
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    // localStorage.removeItem('user');
    // localStorage.removeItem('rememberMe');
    
    return {
      success: true,
      message: "Logged out successfully!"
    };
  }
};
