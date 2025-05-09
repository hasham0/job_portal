import { ApplicationTS } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ApplicantsStateTS {
  allApplicants: ApplicationTS[];
  allAppliedJobs: ApplicationTS[];
  setAllApplicants?: (applicants: ApplicationTS[]) => void;
  setUpdateApplicant?: (applicant: ApplicationTS) => void;
  setAllAppliedJobs?: (applicants: ApplicationTS[]) => void;
}

// Define the initial state using that type
const initialState: ApplicantsStateTS = {
  allApplicants: [],
  allAppliedJobs: [],
};

export const applicantSlice = createSlice({
  name: "applicants",
  initialState,
  reducers: {
    setAllApplicants: (
      state: ApplicantsStateTS,
      action: PayloadAction<ApplicationTS[]>,
    ) => {
      state.allApplicants = action.payload;
    },

    setAllAppliedJobs: (
      state: ApplicantsStateTS,
      action: PayloadAction<ApplicationTS[]>,
    ) => {
      state.allAppliedJobs = action.payload;
    },

    setUpdateApplicant: (
      state: ApplicantsStateTS,
      action: PayloadAction<ApplicationTS>,
    ) => {
      const index = state.allApplicants.findIndex(
        (applicant) => applicant._id === action.payload._id,
      );
      state.allApplicants[index].status = action.payload.status;
    },
  },
});

export const { setAllApplicants, setUpdateApplicant, setAllAppliedJobs } =
  applicantSlice.actions;

export default applicantSlice.reducer;
