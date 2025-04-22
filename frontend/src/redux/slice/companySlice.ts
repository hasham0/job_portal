import { CompanyTS } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

// Define a type for the slice state
interface CompanySliceTS {
  singleCompany: CompanyTS | null;
  loading: boolean;
  companies: CompanyTS[] | null;
  setSingleCompany?: (company: CompanyTS) => void;
  setLoading?: (loading: boolean) => void;
  setCompanies?: (companies: CompanyTS[]) => void;
}

// Define the initial state using that type
const initialState: CompanySliceTS = {
  singleCompany: null,
  loading: false,
  companies: [],
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setLoading: (state: CompanySliceTS, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSingleCompany: (
      state: CompanySliceTS,
      action: PayloadAction<CompanyTS>,
    ) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (
      state: CompanySliceTS,
      action: PayloadAction<CompanyTS[]>,
    ) => {
      state.companies = action.payload;
    },
  },
});

export const { setSingleCompany, setLoading, setCompanies } =
  companySlice.actions;

export default companySlice.reducer;
