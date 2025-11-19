import axios from "axios";

// Single todo item from backend
export interface IBackendTodo {
  id: string;
  title: string;
  description: string;
  priority: "low" | "moderate" | "high";
  is_completed: boolean;
  position: string;
  todo_date: string;
  created_at: string;
  updated_at: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_BASE_API}/todos/`;

export const getAllTodos = async (): Promise<{ success: boolean; data?: IBackendTodo[]; message?: string }> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return { success: false, message: "No access token found" };
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { success: true, data: response?.data };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { 
      success: false, 
      message: error?.response?.data?.detail || "Failed to fetch todos" 
    };
  }
};
