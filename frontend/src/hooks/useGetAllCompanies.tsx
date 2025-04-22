import axiosInstance from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setCompanies } from "@/redux/slice/companySlice";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { useEffect } from "react";

const useGetAllCompanies = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const response = await axiosInstance.get(`${COMPANY_API_ENDPOINT}/`, {
          withCredentials: true,
        });
        if (response.data) {
          dispatch(setCompanies(response.data.companies));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleCompany();
  }, []);
};

export default useGetAllCompanies;
