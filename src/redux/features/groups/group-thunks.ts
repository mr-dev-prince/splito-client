import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/lib/api";
import type { Group, GroupMember } from "./group-types";

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
  } catch (err) {
    let message = "An unexpected error occurred.";
    if (err instanceof Error) {
      message = err.message;
    }
    return rejectWithValue(message);
  }
});

export const addGroupMember = createAsyncThunk<
  GroupMember,
  { groupId: number; name: string; email: string | null; phone: string | null },
  { rejectValue: string | undefined }
>(
  "groups/addGroupMember",
  async ({ groupId, name, email, phone }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/groups/${groupId}/members`, {
        name,
        email,
        phone,
      });
      return res.data;
    } catch (error) {
      let message = "An unexpected error occurred.";
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  },
);

export const fetchGroupData = createAsyncThunk<
  Group,
  { groupId: number },
  { rejectValue: string | undefined }
>("groups/fetchGroupData", async ({ groupId }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/groups/${groupId}`);
    return res.data as Group;
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

export const deleteGroup = createAsyncThunk<
  void,
  { groupId: number },
  { rejectValue: string | undefined }
>("groups/deleteGroup", async ({ groupId }, { dispatch, rejectWithValue }) => {
  try {
    await api.delete(`/groups/${groupId}`);
    dispatch(fetchGroups());
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});
