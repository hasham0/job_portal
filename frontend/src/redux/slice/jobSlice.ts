import { JobsTS } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface JobStateTS {
  allJobs: Array<JobsTS>;
  singleJobDetails: JobsTS;
  setAllJobs?: () => void;
  setJobDetails?: () => void;
}

// Define the initial state using that type
const initialState: JobStateTS = {
  allJobs: [],
  singleJobDetails: {
    _id: "",
    title: "",
    description: "",
    requirments: [],
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
    setAllJobs: (state, action: PayloadAction<Array<JobsTS>>) => {
      state.allJobs = action.payload;
    },

    setJobDetails: (state, action: PayloadAction<JobsTS>) => {
      state.singleJobDetails = action.payload;
    },
  },
});

export const { setAllJobs, setJobDetails } = jobSlice.actions;

export default jobSlice.reducer;
