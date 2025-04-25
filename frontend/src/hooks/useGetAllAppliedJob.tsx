import axiosInstance from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setAllAppliedJobs } from "@/redux/slice/applicantsSlice";
import { APPLICANT_API_ENDPOINT } from "@/utils/constant";
import { useEffect } from "react";

const useGetAllAppliedJobs = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchAllAppliedJobs = async () => {
      try {
        const response = await axiosInstance.get(
          `${APPLICANT_API_ENDPOINT}/appliedJobs/`,
          {
            withCredentials: true,
          },
        );
        if (response.data) {
          dispatch(setAllAppliedJobs(response.data.jobs));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllAppliedJobs();
  }, []);
};

export default useGetAllAppliedJobs;
