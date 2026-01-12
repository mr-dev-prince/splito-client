import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import type { Group } from "./group-types";

export const fetchGroups = createAsyncThunk<
  Group[],
  void,
  { rejectValue: string | undefined }
>("groups/fetchGroups", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/groups");
    return res.data as Group[];
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

export const createGroup = createAsyncThunk<
  Group,
  { name: string },
  { rejectValue: string }
>("groups/createGroup", async ({ name }, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.post("/groups", { name });
    dispatch(fetchGroups());
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.message || "Failed to create group");
  }
});
