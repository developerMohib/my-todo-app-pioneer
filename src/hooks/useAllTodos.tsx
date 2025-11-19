import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_API ;

const fetchAllTodos = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("No access token found");
  }

  const res = await axios.get(`${API_URL}/todos/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res.data.results;
};

export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchAllTodos,
    staleTime: 1000 * 60,
    retry: 2,
  });
};
