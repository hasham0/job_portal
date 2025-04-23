import axiosInstance from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setAllAdminJobs } from "@/redux/slice/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { useEffect } from "react";

const useGetAllAdminJobs = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const response = await axiosInstance.get(
          `${JOB_API_ENDPOINT}/adminJobs`,
          {
            withCredentials: true,
          },
        );
        if (response.data) {
          dispatch(setAllAdminJobs(response.data.jobs));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
