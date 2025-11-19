"use server";
import axios from "axios";
import { cookies } from "next/headers";

const app_axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

app_axios.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default app_axios;

// "use client";

// import axios from "axios";

// const app_axios = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_API,
//   withCredentials: true,
// });

// // get tokens from localStorage
// app_axios.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = token;
//   }
//   return config;
// });

// export default app_axios;
