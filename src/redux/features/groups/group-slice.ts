import { createSlice } from "@reduxjs/toolkit";
import type { GroupDetails, GroupsState } from "./group-types";
import {
  addGroupMember,
  createGroup,
  deleteGroup,
  fetchGroupData,
  fetchGroups,
} from "./group-thunks";

const initialState: GroupsState = {
  list: [],
  loading: false,
  error: null,
  currentGroup: null,
  currentGroupLoading: false,
  currentGroupError: null,
  deleteGroupLoading: false,
  deleteGroupError: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    clearGroupsError(state) {
      state.error = null;
      state.currentGroupError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchGroups
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // create group
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create group";
      })

      // add group member
      .addCase(addGroupMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(addGroupMember.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addGroupMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to add group member";
      })

      // fetch group data
      .addCase(fetchGroupData.pending, (state) => {
        state.currentGroupLoading = true;
      })
      .addCase(fetchGroupData.fulfilled, (state, action) => {
        state.currentGroupLoading = false;
        state.currentGroup = action.payload as GroupDetails;
      })
      .addCase(fetchGroupData.rejected, (state, action) => {
        state.currentGroupLoading = false;
        state.currentGroupError =
          action.payload ?? "Failed to fetch group data";
      })

      // delete group
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (group) => group.id !== (action.meta.arg.groupId as number),
        );
        state.deleteGroupLoading = false;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.deleteGroupError = action.payload as string;
        state.deleteGroupLoading = false;
      })
      .addCase(deleteGroup.pending, (state) => {
        state.deleteGroupLoading = true;
        state.deleteGroupError = null;
      });
  },
});

export const { clearGroupsError } = groupsSlice.actions;
export default groupsSlice.reducer;
