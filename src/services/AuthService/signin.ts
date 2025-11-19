import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_API}/auth/login/`;

interface LoginData {
  email: string;
  password: string;
}

export const signInUser = async (data: LoginData) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // If login is successful, store tokens in localStorage
    const { access, refresh } = response.data;
    if (access && refresh) {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    }

    return {
      success: true,
      data: response.data,
      message: "Login successful!",
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.detail || "Login failed!",
      status: error?.response?.status,
    };
  }
};
