
export interface AuthResponse {
  success: boolean;
  data?: {
    refresh: string;
    access: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: any;
  };
  message: string;
  status?: number;
}

export const logoutUser = async (): Promise<AuthResponse> => {
  try {
   
    // Clear local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");

    return {
      success: true,
      message: "Logged out successfully!",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Even if API call fails, clear local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    console.log(error)

    return {
      success: true,
      message: "Logged out successfully!",
    };
  }
};
