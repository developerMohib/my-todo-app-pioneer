/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import app_axios from "@/lib/axios";

// import { cookies } from "next/headers";

// Registation Api Service
// export const signUpUser = async ( formData: any ) => {
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/signup`, {
//             method: "POST",
//             // headers: {
//             //     "Content-Type": "application/json",
//             // },
//             // body: JSON.stringify(formData),
//             body: formData,
//         });
//         const result = await res.json();

//         if (result.success) {
//             (await cookies()).set("accessToken", result.data.accessToken);
//             (await cookies()).set("refreshToken", result?.data?.refreshToken);
//         }

//         return result;
//     } catch (error: any) {
//         return Error(error);
//     }
// };

// export const signUpUser = async (formData: FormData) => {
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/signup`, {
//             method: "POST",
//             body: formData, // <-- MUST be FormData
//             // ❌ DO NOT set Content-Type for FormData
//         });

//         const result = await res.json();
//         console.log(result);

//         return result;

//     } catch (error: any) {
//         console.error(error);
//         return Error(error);
//     }
// };

// services/auth.ts
// export const signUpUser = async (formData: FormData) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/signup/`, {
//       method: "POST",
//       body: formData, // FormData sent — DO NOT set Content-Type header
//     });

//     const contentType = res.headers.get("content-type") ?? "";

//     // Debug logs (remove or adapt in production)
//     console.log("signup status:", res.status);
//     console.log("signup content-type:", contentType);

//     if (contentType.includes("application/json")) {
//       const result = await res.json();
//       return result;
//     } else {
//       // Not JSON — capture the HTML/text to see what backend returned
//       const text = await res.text();
//       console.error("Non-JSON response from signup:", res.status, text);
//       // return an object shaped like an error so your UI can show it
//       return {
//         success: false,
//         status: res.status,
//         message: "Server did not return JSON. See console for response body.",
//         body: text,
//       };
//     }
//   } catch (err: any) {
//     console.error("fetch error:", err);
//     return { success: false, message: err.message || String(err) };
//   }
// };

// export const signUpUser = async (formData: FormData) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/signup`, {
//       method: "POST",
//       body: formData,   // MUST be FormData
//       // ⚠️ কোনো header দেবে না — Browser নিজেই multipart/form-data সেট করবে
//     });

//     const result = await res.json();
//     return result;

//   } catch (error: any) {
//     console.error("Signup Fetch Error:", error);
//     return { success: false, message: error.message };
//   }
// };

// export const signUpUser = async (formData: FormData) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/users/signup`, {
//       method: "POST",
//       body: formData,
//     });

//     const type = res.headers.get("content-type") || "";

//     console.log("STATUS:", res.status);
//     console.log("CONTENT-TYPE:", type);

//     if (type.includes("application/json")) {
//       return await res.json();
//     }

//     // 🛑 JSON না হলে HTML/text দেখিয়ে দাও
//     const text = await res.text();
//     console.log("HTML RESPONSE:", text);

//     return {
//       success: false,
//       message: "Backend returned HTML instead of JSON",
//       raw: text,
//       status: res.status
//     };

//   } catch (error) {
//     console.error("FETCH ERROR:", error);
//     return { success: false, message: error.message };
//   }
// };

interface SignUpData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// export const signUpUser = async (data: SignUpData) => {
//   console.log("backend data ss:", data);
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/users/signup`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//         // body: formData,
//       }
//     );

//     const result = await res.json();

//     // console.log("backend result",result);

//     return result;
//   } catch (error: any) {
//     console.error("Fetch Error:", error);
//     return { success: false, message: error.message };
//   }
// };

// export const signUpUser = async (data: SignUpData) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/users/signup`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       }
//     );

//     const text = await res.text(); // First get text
//     try {
//       const result = JSON.parse(text); // Then parse
//       return result;
//     } catch {
//       console.error("Server did not return JSON:", text);
//       return { success: false, message: "Server returned non-JSON response" };
//     }
//   } catch (error: any) {
//     console.error("Fetch Error:", error);
//     return { success: false, message: error.message };
//   }
// };

export const signUpUser = async (data: SignUpData) => {

    console.log(data);
    
  try {
    const res = await app_axios.post("/users/signup", data);
    return res.data;
  } catch (error: any) {
    console.error("Signup failed:", error);
    const message = error?.response?.data?.message || "Something went wrong during sign up!";
    throw new Error(message);
  }

};