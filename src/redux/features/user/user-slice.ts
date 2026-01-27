import {
  getUserDetails,
  removeUserPin,
  setUserPin,
  verifyUserPin,
} from "./user-thunk";

import type { UserState } from "./user-types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
  securityPinSet: false,
  securityPinLoading: false,
  securityPinError: null,
  verifyPinLoading: false,
  verifyPinError: null,
  deactivatePinLoading: false,
  deactivatePinError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getUserDetails
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // setUserPin
      .addCase(setUserPin.pending, (state) => {
        state.securityPinLoading = true;
        state.securityPinError = null;
      })
      .addCase(setUserPin.fulfilled, (state) => {
        state.securityPinLoading = false;
        state.securityPinSet = true;
      })
      .addCase(setUserPin.rejected, (state, action) => {
        state.securityPinLoading = false;
        state.securityPinError = action.payload ?? "Something went wrong";
      })

      // verifyUserPin
      .addCase(verifyUserPin.pending, (state) => {
        state.verifyPinLoading = true;
        state.verifyPinError = null;
      })
      .addCase(verifyUserPin.fulfilled, (state) => {
        state.verifyPinLoading = false;
        state.securityPinSet = true;
        sessionStorage.setItem("isPinVerified", "true");
      })
      .addCase(verifyUserPin.rejected, (state, action) => {
        state.verifyPinLoading = false;
        state.verifyPinError = action.payload ?? "Something went wrong";
      })

      // removeUserPin
      .addCase(removeUserPin.pending, (state) => {
        state.deactivatePinLoading = true;
        state.deactivatePinError = null;
      })
      .addCase(removeUserPin.fulfilled, (state) => {
        state.deactivatePinLoading = false;
        state.securityPinSet = false;
      })
      .addCase(removeUserPin.rejected, (state, action) => {
        state.deactivatePinLoading = false;
        state.deactivatePinError = action.payload ?? "Something went wrong";
      });
  },
});

export const { clearUserError } = userSlice.actions;

export default userSlice.reducer;
