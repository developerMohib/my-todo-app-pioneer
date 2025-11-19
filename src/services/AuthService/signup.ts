import axios from "axios";

// const API_URL = "https://todo-app.pioneeralpha.com/api/users/signup/";

export const signupUser = async (data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/signup/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      success: true,
      data: response.data,
      message: "Signup Successful!",
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.detail || "Signup failed!",
      error: error?.response?.data,
    };
  }
};
