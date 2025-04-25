import { JobsTS } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface JobStateTS {
  loading: boolean;
  allJobs: Array<JobsTS>;
  allAdminJobs: Array<JobsTS>;
  singleJobDetails: JobsTS;
  serachJobByText: string;

  setLoading?: (loading: boolean) => void;
  setAllJobs?: () => void;
  setJobDetails?: () => void;
  setSearchJobByText?: (text: string) => void;
  setAllAdminJobs?: () => void;
  setRemoveJob?: (_id: string) => void;
  setUpdateJob?: () => void;
}

// Define the initial state using that type
const initialState: JobStateTS = {
  loading: false,
  allJobs: [],
  allAdminJobs: [],
  serachJobByText: "",
  singleJobDetails: {
    _id: "",
    title: "",
    description: "",
    requirements: [],
    salary: 0,
    experienceLevel: 0,
    location: "",
    jobType: "",
    position: 0,
    company: "",
    createdAt: "", // Nullable Date
    updatedAt: "",
    applications: [],
    created_by: "",
  },
};

export const jobSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAllJobs: (state, action: PayloadAction<Array<JobsTS>>) => {
      state.allJobs = action.payload;
    },

    setJobDetails: (state, action: PayloadAction<JobsTS>) => {
      state.singleJobDetails = action.payload;
    },
    setSearchJobByText: (state, action: PayloadAction<string>) => {
      state.serachJobByText = action.payload;
    },
    setAllAdminJobs: (state, action: PayloadAction<Array<JobsTS>>) => {
      state.allAdminJobs = action.payload;
    },
    setRemoveJob: (state, action: PayloadAction<string>) => {
      state.allAdminJobs = state.allAdminJobs.filter(
        (job) => job._id !== action.payload,
      );
    },
    setUpdateJob: (state, action: PayloadAction<JobsTS>) => {
      const index = state.allAdminJobs.findIndex(
        (job) => job._id === action.payload._id,
      );
      if (index !== -1) {
        state.allAdminJobs[index] = action.payload;
      }
    },
  },
});

export const {
  setLoading,
  setAllJobs,
  setJobDetails,
  setSearchJobByText,
  setAllAdminJobs,
  setRemoveJob,
  setUpdateJob,
} = jobSlice.actions;

export default jobSlice.reducer;
