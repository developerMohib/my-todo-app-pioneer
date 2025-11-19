import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_API}/users/me/`;

export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_number: string;
  birthday: string | null;
  profile_image: string | null;
  bio: string;
}


export const getCurrentUser = async (): Promise<{
  success: boolean;
  data?: UserProfile;
  message?: string;
}> => {
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
    return { success: true, data: response.data };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.detail || "Failed to fetch user data",
    };
  }
};
