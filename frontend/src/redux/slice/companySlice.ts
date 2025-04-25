import { set } from "react-hook-form";
import { CompanyTS } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CompanySliceTS {
  singleCompany: CompanyTS | null;
  loading: boolean;
  companies: CompanyTS[] | null;
  serachCompanyByText: string;

  setSingleCompany?: (company: CompanyTS) => void;
  setLoading?: (loading: boolean) => void;
  setCompanies?: (companies: CompanyTS[]) => void;
  setSerachCompanyByText?: (text: string) => void;
  setRemoveCompany?: (_id: string) => void;
  setUpdateCompany?: () => void;
}

// Define the initial state using that type
const initialState: CompanySliceTS = {
  singleCompany: null,
  loading: false,
  companies: [],
  serachCompanyByText: "",
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
    setSerachCompanyByText: (
      state: CompanySliceTS,
      action: PayloadAction<string>,
    ) => {
      state.serachCompanyByText = action.payload;
    },
    setRemoveCompany: (
      state: CompanySliceTS,
      action: PayloadAction<string>,
    ) => {
      if (state.companies) {
        state.companies = state.companies.filter(
          (company) => company._id !== action.payload,
        );
      }
    },
    setUpdateCompany: (
      state: CompanySliceTS,
      action: PayloadAction<CompanyTS>,
    ) => {
      if (state.companies) {
        const index = state.companies.findIndex(
          (company) => company._id === action.payload._id,
        );
        if (index !== -1) {
          state.companies[index] = action.payload;
        }
      }
    },
  },
});

export const {
  setSingleCompany,
  setLoading,
  setCompanies,
  setSerachCompanyByText,
  setRemoveCompany,
  setUpdateCompany,
} = companySlice.actions;

export default companySlice.reducer;
