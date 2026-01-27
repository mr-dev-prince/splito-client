import type { GroupMember } from "../groups/group-types";
import { api } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGroupMembers = createAsyncThunk<
  GroupMember[],
  { groupId: number },
  { rejectValue: string | undefined }
>("members/fetchGroupMembers", async ({ groupId }, { rejectWithValue }) => {
  try {
    const res = await api.get(`/groups/${groupId}/members`);
    return res.data as GroupMember[];
  } catch (error) {
    let message = "An unexpected error occurred.";
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});
