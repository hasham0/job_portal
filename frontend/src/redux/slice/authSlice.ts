import { UserTS } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthStateTS {
  loading: boolean;
  user: UserTS | null;
  setLoading?: (loading: boolean) => void;
  setUser?: (user: UserTS) => void;
}

// Define the initial state using that type
const initialState: AuthStateTS = {
  loading: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state: AuthStateTS, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state: AuthStateTS, action: PayloadAction<UserTS>) => {
      state.user = action.payload;
    },
  },
});

export const { setLoading, setUser } = authSlice.actions;

export default authSlice.reducer;
