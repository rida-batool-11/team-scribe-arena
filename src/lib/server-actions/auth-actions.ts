"use server";

import { z } from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { FormSchema } from "../types";
import { cookies } from "next/headers";

// export async function actionLoginUser({
//   email,
//   password,
// }: z.infer<typeof FormSchema>) {
//   const supabase = createRouteHandlerClient({ cookies });
//   const response = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });
//   console.log(response);
//   return response;
// }

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Check if there's an error in the response
    if (response.error) {
      console.error("Login Error:", response.error.message);
      return { error: response.error.message, data: null };
    }

    // Return user data if successful
    return { error: null, data: response.data };
  } catch (err) {
    console.error("Unexpected Error:", err);

    // Return a generic error message for unexpected errors
    return {
      error: "An unexpected error occurred. Please try again later.",
      data: null,
    };
  }
}

// export async function actionSignUpUser({
//   email,
//   password,
// }: z.infer<typeof FormSchema>) {
//   const supabase = createRouteHandlerClient({ cookies });
//   const { data } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("email", email);

//   if (data?.length) return { error: { message: "User already exists", data } };
//   const response = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
//     },
//   });
//   return response;
// }

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    // Check if the email is already registered
    const { data, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (profileError) {
      console.error("Error fetching profiles:", profileError.message);
      return {
        error: "Failed to check user existence. Please try again later.",
        data: null,
      };
    }

    if (data?.length) {
      return { error: "User already exists.", data: null };
    }

    // Proceed to sign up the user
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });

    if (response.error) {
      console.error("Sign-up error:", response.error.message);
      return { error: response.error.message, data: null };
    }

    // Return success response
    return { error: null, data: response.data };
  } catch (err) {
    console.error("Unexpected error during sign-up:", err);
    return {
      error: "An unexpected error occurred. Please try again later.",
      data: null,
    };
  }
}
