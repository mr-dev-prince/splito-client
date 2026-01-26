import type { GroupDetails, GroupsState } from "./group-types";
import {
  addGroupMember,
  createGroup,
  deleteGroup,
  fetchAdminGroupSettlements,
  fetchGroupAnalytics,
  fetchGroupData,
  fetchGroups,
  fetchWeeklyActivity,
  updateGroupName,
} from "./group-thunks";

import { createSlice } from "@reduxjs/toolkit";

const initialState: GroupsState = {
  // All groups
  list: [],
  loading: false,
  error: null,
  // Current group details
  currentGroup: null,
  currentGroupLoading: false,
  currentGroupError: null,
  // Current group weekly activity
  currentGroupWeeklyActivity: null,
  currentGroupWeeklyActivityLoading: false,
  currentGroupWeeklyActivityError: null,
  // Delete group
  deleteGroupLoading: false,
  deleteGroupError: null,
  // Update group
  currentGroupUpdating: false,
  currentGroupUpdateError: null,
  // Admin group settlements
  adminGroupSettlements: [],
  adminGroupSettlementsLoading: false,
  adminGroupSettlementsError: null,
  // Group analytics
  groupAnalytics: null,
  groupAnalyticsLoading: false,
  groupAnalyticsError: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    clearGroupsError(state) {
      state.error = null;
      state.currentGroupError = null;
      state.currentGroupUpdateError = null;
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
      })

      // fetchWeeklyActivity
      .addCase(fetchWeeklyActivity.pending, (state) => {
        state.currentGroupWeeklyActivityLoading = true;
      })
      .addCase(fetchWeeklyActivity.fulfilled, (state, action) => {
        state.currentGroupWeeklyActivity = action.payload;
        state.currentGroupWeeklyActivityLoading = false;
      })
      .addCase(fetchWeeklyActivity.rejected, (state, action) => {
        state.currentGroupWeeklyActivityLoading = false;
        state.currentGroupWeeklyActivityError =
          action.payload ?? "Failed to fetch weekly activity";
      })

      // updateGroupName
      .addCase(updateGroupName.pending, (state) => {
        state.currentGroupUpdating = true;
        state.currentGroupUpdateError = null;
      })
      .addCase(updateGroupName.fulfilled, (state) => {
        state.currentGroupUpdating = false;
      })
      .addCase(updateGroupName.rejected, (state) => {
        state.currentGroupUpdating = false;
        state.currentGroupUpdateError = "Failed to update group name";
      })

      // fetchAdminGroupSettlments
      .addCase(fetchAdminGroupSettlements.pending, (state) => {
        state.adminGroupSettlementsLoading = true;
        state.adminGroupSettlementsError = null;
      })
      .addCase(fetchAdminGroupSettlements.fulfilled, (state, action) => {
        state.adminGroupSettlementsLoading = false;
        state.adminGroupSettlements = action.payload;
      })
      .addCase(fetchAdminGroupSettlements.rejected, (state, action) => {
        state.adminGroupSettlementsLoading = false;
        state.adminGroupSettlementsError =
          action.payload ?? "Failed to fetch group settlements";
      })

      // fetchGroupAnalytics
      .addCase(fetchGroupAnalytics.pending, (state) => {
        state.groupAnalyticsLoading = true;
        state.groupAnalyticsError = null;
      })
      .addCase(fetchGroupAnalytics.fulfilled, (state, action) => {
        state.groupAnalyticsLoading = false;
        state.groupAnalytics = action.payload;
      })
      .addCase(fetchGroupAnalytics.rejected, (state, action) => {
        state.groupAnalyticsLoading = false;
        state.groupAnalyticsError =
          action.payload ?? "Failed to fetch group analytics";
      });
  },
});

export const { clearGroupsError } = groupsSlice.actions;
export default groupsSlice.reducer;
