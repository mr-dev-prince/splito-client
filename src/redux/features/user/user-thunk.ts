import type { User } from "./user-types";
import { api } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserDetails = createAsyncThunk<
  User,
  void,
  { rejectValue: string | undefined }
>("users/getUserDetails", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/users/me");
    return res.data as User;
  } catch (error) {
    let message = "An unexpected error occurred.";
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

export const setUserPin = createAsyncThunk<
  { message: string },
  { pin: string },
  { rejectValue: string | undefined }
>("users/setUserPin", async ({ pin }, { rejectWithValue }) => {
  try {
    const res = await api.post(`/users/security/set-pin`, { pin });
    return res.data as { message: string };
  } catch (error) {
    let message = "An unexpected error occurred.";
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

export const verifyUserPin = createAsyncThunk<
  { valid: boolean },
  { pin: string },
  { rejectValue: string | undefined }
>("users/verifyUserPin", async ({ pin }, { rejectWithValue }) => {
  try {
    const res = await api.post(`/users/security/verify-pin`, { pin });
    return res.data as { valid: boolean };
  } catch (error) {
    let message = "An unexpected error occurred.";
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

export const removeUserPin = createAsyncThunk<
  { message: string },
  void,
  { rejectValue: string | undefined }
>("users/removeUserPin", async (_, { rejectWithValue }) => {
  try {
    const res = await api.put(`/users/security/deactivate-pin`);
    return res.data as { message: string };
  } catch (error) {
    let message = "An unexpected error occurred.";
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});
