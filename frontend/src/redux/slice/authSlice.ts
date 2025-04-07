import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface AuthStateTS {
  loading: boolean;
  setLoading?: (loading: boolean) => void;
}

// Define the initial state using that type
const initialState: AuthStateTS = {
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state: AuthStateTS, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = authSlice.actions;

export default authSlice.reducer;
